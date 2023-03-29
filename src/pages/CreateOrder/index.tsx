import type {
  ApiResponse,
  CreateOrder as CreateOrderType,
  Order,
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

export const CreateOrder = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [order, setOrder] = useState<CreateOrderType>({
    table: 0,
    status: 'WAITING',
    createdAt: new Date().toLocaleString('pt-BR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    }),
    products: [],
    customerName: '',
  });

  const hasValidValues = Object.values(order).every(value => !!value);

  const handleSelectProducts = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setOrder(values => {
      if (
        values.products.some(product => product.id === JSON.parse(value)?.id)
      ) {
        toast.warning(
          `O produto ${JSON.parse(value)?.name} já está adicionado ao pedido`
        );
        return {
          ...values,
          products: values.products,
        };
      }

      toast.success(
        `O produto ${JSON.parse(value)?.name} foi adicionado ao pedido`
      );
      return {
        ...values,
        products: [...values.products, JSON.parse(value)],
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasValidValues) {
      toast.warning('Dados inválidos');
      return;
    }

    try {
      const { status } = await api.post<ApiResponse<Order>>(
        '/orders/create',
        order
      );

      if ([200, 201].includes(status)) navigate('/');
    } catch (error) {
      return;
    }
  };

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout gap="3rem">
      <LoginStyles.Form onSubmit={handleSubmit}>
        <S.Title>Novo pedido</S.Title>

        <LoginStyles.InputsWrapper>
          <input
            placeholder="Número da mesa"
            type="number"
            min={0}
            onChange={({ target: { value } }) =>
              setOrder(oldValues => ({ ...oldValues, table: Number(value) }))
            }
          />

          <select
            autoComplete="on"
            onChange={handleSelectProducts}
            disabled={!products.length}
          >
            <option selected hidden>
              {products.length
                ? 'Selecione um produto'
                : 'Não existem produtos criados'}
            </option>
            {products.map(product => (
              <option key={product.id} value={JSON.stringify(product)}>
                {product.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Nome do cliente"
            type="text"
            onChange={({ target: { value } }) =>
              setOrder(oldValues => ({ ...oldValues, customerName: value }))
            }
          />

          <button type="submit" className="primary">
            Criar pedido
          </button>
        </LoginStyles.InputsWrapper>
      </LoginStyles.Form>
    </Layout>
  );
};
