import type { Product } from '@types';
import { Layout } from 'components/layout/Layout';
import { useState } from 'react';

import * as S from './styles';

type State = {
  product: Product | null;
  modalOpened: boolean;
};

export const Home = () => {
  const [state, setState] = useState<State>({
    product: null,
    modalOpened: false,
  });

  return (
    <Layout gap="3rem">
      <S.Card>
        <S.CardTitle>
          <span>🕑</span>
          <span className="title">Fila de espera</span>
          <span>(1)</span>
        </S.CardTitle>

        <S.CardContent>
          <S.CardItem
            onClick={() =>
              setState({
                modalOpened: true,
                product: null,
              })
            }
          >
            <span className="title">Mesa 2</span>
            <span className="description">2 itens</span>
          </S.CardItem>

          <S.CardItem>
            <span className="title">Mesa 2</span>
            <span className="description">2 itens</span>
          </S.CardItem>

          <S.CardItem>
            <span className="title">Mesa 2</span>
            <span className="description">2 itens</span>
          </S.CardItem>

          <S.CardItem>
            <span className="title">Mesa 2</span>
            <span className="description">2 itens</span>
          </S.CardItem>
        </S.CardContent>
      </S.Card>

      <S.Card>
        <S.CardTitle>
          <span>🧑‍🍳</span>
          <span className="title">Em produção</span>
          <span>(1)</span>
        </S.CardTitle>

        <S.CardContent>
          <S.CardItem>
            <span className="title">Mesa 2</span>
            <span className="description">2 itens</span>
          </S.CardItem>
        </S.CardContent>
      </S.Card>

      <S.Card>
        <S.CardTitle>
          <span>✅</span>
          <span className="title">Pronto</span>
          <span>(1)</span>
        </S.CardTitle>

        <S.CardContent>
          <S.CardItem>
            <span className="title">Mesa 2</span>
            <span className="description">1 item</span>
          </S.CardItem>
        </S.CardContent>
      </S.Card>
    </Layout>
  );
};
