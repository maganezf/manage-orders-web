import type {
  ApiResponse,
  Category,
  CreateCategory as CreateCategoryType,
} from '@types';
import { Layout } from 'components/layout/Layout';
import * as LoginStyles from 'pages/SignIn/styles';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from 'services/api';

import * as S from './styles';

export const CreateCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<CreateCategoryType>({
    name: '',
    description: '',
  });

  const hasValidValues = Object.values(category).every(value => !!value);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasValidValues) {
      toast.warning('Dados inválidos');
      return;
    }

    try {
      const { status } = await api.post<ApiResponse<Category>>(
        '/categories/create',
        category
      );

      if ([200, 201].includes(status)) navigate('/create-new-product');
    } catch (error) {
      return;
    }
  };

  return (
    <Layout gap="3rem">
      <LoginStyles.Form onSubmit={handleSubmit}>
        <S.Title>Nova categoria</S.Title>

        <LoginStyles.InputsWrapper>
          <input
            placeholder="Nome"
            type="text"
            onChange={({ target: { value } }) =>
              setCategory(oldValues => ({ ...oldValues, name: value }))
            }
          />

          <input
            placeholder="Descrição"
            type="text"
            onChange={({ target: { value } }) =>
              setCategory(oldValues => ({ ...oldValues, description: value }))
            }
          />

          <button type="submit" className="primary">
            Criar categoria
          </button>
        </LoginStyles.InputsWrapper>
      </LoginStyles.Form>
    </Layout>
  );
};
