import logo from 'assets/icons/logo.svg';

import * as S from './styles';

export const Header = () => {
  return (
    <S.Wrapper>
      <S.LeftContent>
        <h3>Pedidos</h3>
        <p className="body-text-md">Acompanhe os pedidos dos clientes</p>
      </S.LeftContent>

      <S.RightContent>
        <img
          src={logo}
          alt="Um garçom e uma garçom segurando os pedidos para serem entregues"
        />

        <S.Description>
          <h5>Manage Orders</h5>

          <p className="body-text-md">
            Organizando os pedidos do seu restaurante
          </p>
        </S.Description>
      </S.RightContent>
    </S.Wrapper>
  );
};
