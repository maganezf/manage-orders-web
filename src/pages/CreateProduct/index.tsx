import type {
  ApiResponse,
  Category,
  CreateProduct as CreateProductType,
  Product,
} from '@types';
import type { AxiosResponse } from 'axios';
import { Layout } from 'components/layout/Layout';
import * as LoginStyles from 'pages/SignIn/styles';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from 'services/api';

import * as S from './styles';

export const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<CreateProductType>({
    name: '',
    description: '',
    image:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/food-icon-2-design-template-b7f020f0195178f74a0a241024343dd3_screen.jpg?ts=1627156857',
    price: 0,
    category: {
      name: '',
      description: '',
      id: '',
    },
  });

  const hasValidValues = Object.values(product).every(value => !!value);

  const handleSelectCategories = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setProduct(oldValues => ({
      ...oldValues,
      category: JSON.parse(value),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasValidValues) {
      toast.warning('Dados inválidos');
      return;
    }

    try {
      const { status } = await api.post<ApiResponse<Product>>(
        '/products/create',
        product
      );

      if ([200, 201].includes(status)) navigate('/create-new-order');
    } catch (error) {
      return;
    }
  };

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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Layout gap="3rem">
      <LoginStyles.Form onSubmit={handleSubmit}>
        <S.Title>Novo produto</S.Title>

        <LoginStyles.InputsWrapper>
          <input
            placeholder="Nome"
            type="text"
            onChange={({ target: { value } }) =>
              setProduct(oldValues => ({ ...oldValues, name: value }))
            }
          />

          <input
            placeholder="Descrição"
            type="text"
            onChange={({ target: { value } }) =>
              setProduct(oldValues => ({ ...oldValues, description: value }))
            }
          />

          <input
            placeholder="Preço (R$)"
            type="number"
            min={0}
            onChange={({ target: { value } }) =>
              setProduct(oldValues => ({ ...oldValues, price: Number(value) }))
            }
          />

          <select
            autoComplete="on"
            onChange={handleSelectCategories}
            disabled={!categories.length}
          >
            <option selected hidden>
              {categories.length
                ? 'Selecione uma categoria'
                : 'Não existem categorias criadas'}
            </option>
            {categories.map(category => (
              <option key={category.id} value={JSON.stringify(category)}>
                {category.name}
              </option>
            ))}
          </select>

          <button type="submit" className="primary">
            Criar produto
          </button>
        </LoginStyles.InputsWrapper>
      </LoginStyles.Form>
    </Layout>
  );
};
