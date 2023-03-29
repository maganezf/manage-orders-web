import { TrashSimple } from '@phosphor-icons/react';
import type { ApiResponse, Product } from '@types';
import type { AxiosResponse } from 'axios';
import { Layout } from 'components/layout/Layout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'services/api';

import * as S from './styles';

type CardProps = {
  product: Product;
  deleteProduct: (productId: string) => Promise<void>;
};

const Card = ({ product, deleteProduct }: CardProps) => (
  <S.CardItem key={product.id}>
    <span className="title">{product.name}</span>

    <button
      title="Excluir"
      type="button"
      onClick={() => deleteProduct(product.id)}
    >
      <TrashSimple size={22} color="var(--red)" />
    </button>
  </S.CardItem>
);

export const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const {
        status,
        data: { data },
      }: AxiosResponse<ApiResponse<Product[]>> = await api.get('/products');
      if ([200].includes(status)) setProducts(data);
    } catch (error) {
      return;
    }
  };

  const deleteProduct = async (productId: string) => {
    const shouldDeleteProduct = window.confirm(
      'Você tem certeza de que deseja deletar o produto?'
    );

    if (!shouldDeleteProduct) return;

    try {
      const { status } = await api.delete(`/products/${productId}`);
      if ([200].includes(status)) getProducts();
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout dir="column" gap="3rem">
      <S.NewProductButton
        type="button"
        className="outline"
        onClick={() => navigate('/create-new-product')}
      >
        Novo produto
      </S.NewProductButton>

      <S.Listing>
        <S.CardTitle>
          <span className="title">Produtos</span>
          {!!products.length && <span>({products.length})</span>}
        </S.CardTitle>

        <S.CardContent>
          {products.length ? (
            products.map(product => (
              <Card
                key={product.id}
                product={product}
                deleteProduct={deleteProduct}
              />
            ))
          ) : (
            <p>Não existem produtos criados</p>
          )}
        </S.CardContent>
      </S.Listing>
    </Layout>
  );
};
