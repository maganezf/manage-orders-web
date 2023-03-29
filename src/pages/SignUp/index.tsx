import type { SignInWaiter, Waiter } from '@types';
import logo from 'assets/icons/logo.svg';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from 'services/api';

import * as S from '../SignIn/styles';

export const SignUp = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState<SignInWaiter>({
    username: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });

  const hasValidValues = Object.values(values).every(value => !!value);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasValidValues) {
      toast.warning('Dados inválidos');
      return;
    }

    try {
      const { status } = await api.post<Waiter>('/waiters/create', values);
      if ([200, 201].includes(status)) navigate('/sign-in');
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
            Criar conta
          </button>
        </S.InputsWrapper>
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
