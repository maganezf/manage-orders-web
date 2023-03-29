import { House, SignOut } from '@phosphor-icons/react';
import logo from 'assets/icons/logo.svg';
import { useAuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import * as S from './styles';

export const Header = () => {
  const { setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const signOutFn = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    navigate('/sign-in');
  };

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

          <S.IconsWrapper>
            <House
              size={24}
              alt="ícone de uma casa"
              onClick={() => navigate('/')}
            />

            <SignOut size={24} alt="ícone de sair" onClick={signOutFn} />
          </S.IconsWrapper>
        </S.Description>
      </S.RightContent>
    </S.Wrapper>
  );
};
