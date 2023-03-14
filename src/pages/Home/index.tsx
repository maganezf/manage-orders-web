import type { ApiResponse, Order, Status } from '@types';
import type { AxiosResponse } from 'axios';
import { Layout } from 'components/layout/Layout';
import { useEffect, useState } from 'react';
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
  const [orders, setOrders] = useState<Order[]>([]);

  const waitingOrders = orders.filter(order => order.status === 'WAITING');
  const inProductionOrders = orders.filter(
    order => order.status === 'IN_PRODUCTION'
  );
  const doneOrders = orders.filter(order => order.status === 'DONE');

  const getOrders = async () => {
    try {
      const {
        status,
        data: { data },
      }: AxiosResponse<ApiResponse<Order[]>> = await api.get('/orders');
      if ([200].includes(status)) setOrders(data);
    } catch (error) {
      return;
    }
  };

  const changeStatus = async (order: Order, newStatus: Status) => {
    const shouldChangeStatus = window.confirm(
      `Você deseja mover o status do pedido para "${
        newStatus === 'IN_PRODUCTION' ? 'Em produção' : 'Pronto'
      }"?`
    );

    if (!shouldChangeStatus) return;

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
      return;
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
