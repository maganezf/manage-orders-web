import type { Order, Status } from '@types';
import type { AxiosResponse } from 'axios';
import { Layout } from 'components/layout/Layout';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';

import * as S from './styles';

type CardProps = {
  order: Order;
  changeStatus: (order: Order, newStatus: Status) => Promise<void>;
};

const Card = ({ order, changeStatus }: CardProps) => (
  <S.CardItem key={order.id}>
    <span className="title">Mesa {order.table}</span>

    {order.products.map(product => (
      <p key={product.id} className="description">
        Pedido: {product.name}
      </p>
    ))}

    <S.DateInfo>{order.createdAt}</S.DateInfo>

    {order.status !== 'DONE' && (
      <S.ButtonsWrapper>
        {order.status === 'WAITING' && (
          <button
            title="Alterar status para ➡️ 'Em produção'"
            type="button"
            onClick={() => changeStatus(order, 'IN_PRODUCTION')}
          >
            🧑‍🍳
          </button>
        )}
        <button
          title="Alterar status para ➡️ 'Pronto'"
          type="button"
          onClick={() => changeStatus(order, 'DONE')}
        >
          ✅
        </button>
      </S.ButtonsWrapper>
    )}
  </S.CardItem>
);

export const Home = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '70f88ebd-ae6b-4853-9618-68bf4d1b89d3',
      table: 1,
      status: 'WAITING',
      createdAt: '01/12/2022',
      products: [
        {
          id: '56d717eb-5f19-4fbe-8b06-09ef0b4c9b75',
          name: 'batata',
          description: 'batatinha doce da esquina',
          image:
            'https://v5j9q4b5.rocketcdn.me/wp-content/uploads/2020/08/batatas-origem-tipos-e-utilidades-que-vao-alem-da-alimentacao-23.jpg',
          price: 20,
          category: {
            id: '102a2dad-46ae-405d-8155-b1b6578b6e3d',
            name: 'category1',
            description: 'category bla bla bla',
          },
        },
      ],
      waiter: {
        id: '70f88ebd-ae6b-4853-9618-68bf4d1b89d3',
        name: 'maganez',
        username: 'maganezf',
        password:
          '$2b$10$JmyRERYuF8Y1WdJrCAlMUupv41AMAnZZm3pplai7G6XoseiWKidYO',
      },
      customerName: 'fulano',
    },
  ]);

  const waitingOrders = orders.filter(order => order.status === 'WAITING');
  const inProductionOrders = orders.filter(
    order => order.status === 'IN_PRODUCTION'
  );
  const doneOrders = orders.filter(order => order.status === 'DONE');

  const getOrders = async () => {
    try {
      const { status, data }: AxiosResponse<Order[]> = await api.get('/orders');
      if ([200].includes(status)) setOrders(data);
    } catch (error) {
      toast.error('Ocorreu um erro ao pegar os pedidos');
    }
  };

  const changeStatus = async (order: Order, newStatus: Status) => {
    try {
      const { status }: AxiosResponse<Order> = await api.patch(
        '/orders/edit',
        {
          ...order,
          status: newStatus,
        },
        {
          params: { id: order.id },
        }
      );

      if ([200].includes(status)) await getOrders();
    } catch (error) {
      toast.error('Ocorreu um erro ao mudar o status do pedido');
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout gap="3rem">
      <S.Card>
        <S.CardTitle>
          <span>🕑</span>
          <span className="title">Fila de espera</span>
          <span>({waitingOrders.length})</span>
        </S.CardTitle>

        <S.CardContent>
          {waitingOrders.map(order => (
            <Card key={order.id} order={order} changeStatus={changeStatus} />
          ))}
        </S.CardContent>
      </S.Card>

      <S.Card>
        <S.CardTitle>
          <span>🧑‍🍳</span>
          <span className="title">Em produção</span>
          <span>({inProductionOrders.length})</span>
        </S.CardTitle>

        <S.CardContent>
          {inProductionOrders.map(order => (
            <Card key={order.id} order={order} changeStatus={changeStatus} />
          ))}
        </S.CardContent>
      </S.Card>

      <S.Card>
        <S.CardTitle>
          <span>✅</span>
          <span className="title">Pronto</span>
          <span>({doneOrders.length})</span>
        </S.CardTitle>

        <S.CardContent>
          {doneOrders.map(order => (
            <Card key={order.id} order={order} changeStatus={changeStatus} />
          ))}
        </S.CardContent>
      </S.Card>
    </Layout>
  );
};
