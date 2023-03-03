import logo from 'assets/icons/logo.svg';
import { AxiosError } from 'axios';
import type { Waiter } from 'contexts/AuthContext';
import { useAuthContext } from 'contexts/AuthContext';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from 'services/api';

import * as S from './styles';

export const Login = () => {
  const { setIsAuthenticated, waiter, setWaiter } = useAuthContext();
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

  const setIsLogged = (waiter: Waiter) => {
    setWaiter(waiter);
    setIsAuthenticated(true);
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
      const { data, status } = await api.post<Waiter>('/auth/login', values);

      if ([200].includes(status)) setIsLogged(data);
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
            Login
          </button>
        </S.InputsWrapper>

        <S.SignUpInfo className="body-text-sm">
          Don’t have an account?
          <button
            type="submit"
            className="outline"
            onClick={() => navigate('/signup')}
          >
            SignUp
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

        <p className="body-text-lg">O App do garçom</p>
      </S.ImageWrapper>
    </S.Wrapper>
  );
};
