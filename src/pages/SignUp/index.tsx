import type { Waiter } from '@types';
import logo from 'assets/icons/logo.svg';
import { AxiosError } from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from 'services/api';

import * as S from './styles';

export const SignUp = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
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
      const { data, status } = await api.post<Waiter>(
        '/waiters/create',
        values
      );

      if ([200, 201].includes(status)) navigate('/login');
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.message);
    }
  };

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit}>
        <S.InputsWrapper>
          <input
            placeholder="Nome do garçom"
            name="name"
            type="text"
            onChange={handleChange}
          />

          <input
            placeholder="Nome para login"
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

        <p className="body-text-lg">O App do garçom</p>
      </S.ImageWrapper>
    </S.Wrapper>
  );
};
