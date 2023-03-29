import { TrashSimple } from '@phosphor-icons/react';
import type { ApiResponse, Order, Status } from '@types';
import type { AxiosResponse } from 'axios';
import { Layout } from 'components/layout/Layout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'services/api';

import * as S from './styles';

type CardProps = {
  order: Order;
  changeStatus: (order: Order, newStatus: Status) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
};

const Card = ({ order, changeStatus, deleteOrder }: CardProps) => (
  <S.CardItem key={order.id}>
    <span className="title">Cliente: {order.customerName}</span>
    <span className="title">Mesa: {order.table}</span>

    <p className="description">
      Pedido: {order.products.map(product => product.name).join(', ')}
    </p>

    <S.DateInfo>{order.createdAt}</S.DateInfo>

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

      {order.status !== 'DONE' && (
        <button
          title="Alterar status para ➡️ 'Pronto'"
          type="button"
          onClick={() => changeStatus(order, 'DONE')}
        >
          ✅
        </button>
      )}

      <button
        title="Excluir pedido"
        type="button"
        onClick={() => deleteOrder(order.id)}
      >
        <TrashSimple size={22} color="var(--red)" />
      </button>
    </S.ButtonsWrapper>
  </S.CardItem>
);

export const Homepage = () => {
  const navigate = useNavigate();
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

  const deleteOrder = async (orderId: string) => {
    const shouldDeleteOrder = window.confirm(
      'Você tem certeza de que deseja deletar o pedido?'
    );

    if (!shouldDeleteOrder) return;

    try {
      const { status } = await api.delete(`/orders/${orderId}`);
      if ([200].includes(status)) getOrders();
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout gap="3rem">
      <S.CreationButtons>
        <button
          type="button"
          className="outline"
          onClick={() => navigate('/categories')}
        >
          Categorias
        </button>

        <button
          type="button"
          className="outline"
          onClick={() => navigate('/products')}
        >
          Produtos
        </button>

        <button
          type="button"
          className="outline"
          onClick={() => navigate('/create-new-order')}
        >
          Novo pedido
        </button>
      </S.CreationButtons>

      <S.Row>
        <S.Card>
          <S.CardTitle>
            <span>🕑</span>
            <span className="title">Fila de espera</span>
            {!!waitingOrders.length && <span>({waitingOrders.length})</span>}
          </S.CardTitle>

          <S.CardContent>
            {waitingOrders.map(order => (
              <Card
                key={order.id}
                order={order}
                changeStatus={changeStatus}
                deleteOrder={deleteOrder}
              />
            ))}
          </S.CardContent>
        </S.Card>

        <S.Card>
          <S.CardTitle>
            <span>🧑‍🍳</span>
            <span className="title">Em produção</span>
            {!!inProductionOrders.length && (
              <span>({inProductionOrders.length})</span>
            )}
          </S.CardTitle>

          <S.CardContent>
            {inProductionOrders.map(order => (
              <Card
                key={order.id}
                order={order}
                changeStatus={changeStatus}
                deleteOrder={deleteOrder}
              />
            ))}
          </S.CardContent>
        </S.Card>

        <S.Card>
          <S.CardTitle>
            <span>✅</span>
            <span className="title">Pronto</span>
            {!!doneOrders.length && <span>({doneOrders.length})</span>}
          </S.CardTitle>

          <S.CardContent>
            {doneOrders.map(order => (
              <Card
                key={order.id}
                order={order}
                changeStatus={changeStatus}
                deleteOrder={deleteOrder}
              />
            ))}
          </S.CardContent>
        </S.Card>
      </S.Row>
    </Layout>
  );
};
