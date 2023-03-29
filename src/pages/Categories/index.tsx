import { TrashSimple } from '@phosphor-icons/react';
import type { ApiResponse, Category } from '@types';
import type { AxiosResponse } from 'axios';
import { Layout } from 'components/layout/Layout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'services/api';

import * as S from './styles';

type CardProps = {
  category: Category;
  deleteCategory: (categoryId: string) => Promise<void>;
};

const Card = ({ category, deleteCategory }: CardProps) => (
  <S.CardItem key={category.id}>
    <span className="title">{category.name}</span>

    <button
      title="Excluir"
      type="button"
      onClick={() => deleteCategory(category.id)}
    >
      <TrashSimple size={22} color="var(--red)" />
    </button>
  </S.CardItem>
);

export const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    try {
      const {
        status,
        data: { data },
      }: AxiosResponse<ApiResponse<Category[]>> = await api.get('/categories');
      if ([200].includes(status)) setCategories(data);
    } catch (error) {
      return;
    }
  };

  const deleteCategory = async (categoryId: string) => {
    const shouldDeleteCategory = window.confirm(
      'Você tem certeza de que deseja deletar a categoria?'
    );

    if (!shouldDeleteCategory) return;

    try {
      const { status } = await api.delete(`/categories/${categoryId}`);
      if ([200].includes(status)) getCategories();
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Layout dir="column" gap="3rem">
      <S.NewCategoryButton
        type="button"
        className="outline"
        onClick={() => navigate('/create-new-category')}
      >
        Nova categoria
      </S.NewCategoryButton>

      <S.Listing>
        <S.CardTitle>
          <span className="title">Categorias</span>
          {!!categories.length && <span>({categories.length})</span>}
        </S.CardTitle>

        <S.CardContent>
          {categories.length ? (
            categories.map(category => (
              <Card
                key={category.id}
                category={category}
                deleteCategory={deleteCategory}
              />
            ))
          ) : (
            <p>Não existem categorias criadas</p>
          )}
        </S.CardContent>
      </S.Listing>
    </Layout>
  );
};
