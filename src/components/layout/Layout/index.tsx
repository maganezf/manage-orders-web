import { Header } from 'components/layout/Header';
import { ReactNode } from 'react';

import * as S from './styles';

export type Direction = 'row' | 'column';

interface LayoutProps {
  children: ReactNode;
  dir?: Direction;
}

export const Layout = ({ children, dir = 'row' }: LayoutProps) => {
  return (
    <S.Wrapper>
      <Header />
      <S.Content dir={dir}>{children}</S.Content>
    </S.Wrapper>
  );
};
