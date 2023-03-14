import type { ApiResponse } from '@types';
import logo from 'assets/icons/logo.svg';
import { useAuthContext } from 'contexts/AuthContext';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from 'services/api';

import * as S from './styles';

export const Login = () => {
  const { setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });

  const setIsLogged = (token: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
    navigate('/');
  };

  const hasValidValues = Object.values(values).every(value => !!value);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasValidValues) {
      toast.warning('Dados inválidos');
      return;
    }

    try {
      const {
        data: { data },
        status,
      } = await api.post<ApiResponse<{ token: string }>>('/auth/login', values);

      if ([200, 201].includes(status)) setIsLogged(data.token);
    } catch (error) {
      return;
    }
  };

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit}>
        <S.Title>Manage Orders</S.Title>

        <S.InputsWrapper>
          <input
            placeholder="Nome do usuário"
            name="username"
            type="text"
            onChange={handleChange}
          />

          <input
            placeholder="Senha"
            name="password"
            type="password"
            onChange={handleChange}
          />

          <button type="submit" className="primary">
            Login
          </button>
        </S.InputsWrapper>

        <S.SignUpInfo className="body-text-sm">
          Não tem uma conta?
          <button
            type="submit"
            className="outline"
            onClick={() => navigate('/signup')}
          >
            Criar conta
          </button>
        </S.SignUpInfo>
      </S.Form>

      <S.ImageWrapper>
        <img
          title="Manage Orders"
          className="logo"
          src={logo}
          alt="manage orders logo"
        />

        <p className="body-text-lg">
          Organizando os pedidos do seu restaurante
        </p>
      </S.ImageWrapper>
    </S.Wrapper>
  );
};
