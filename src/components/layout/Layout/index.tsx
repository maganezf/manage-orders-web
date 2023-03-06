import { Header } from 'components/layout/Header';
import { ReactNode } from 'react';

import * as S from './styles';

type Direction = 'row' | 'column';

export interface LayoutProps {
  children: ReactNode;
  dir?: Direction;
  gap?: string;
}

export const Layout = ({ children, dir = 'row', gap }: LayoutProps) => {
  return (
    <S.Wrapper>
      <Header />
      <S.Content dir={dir} gap={gap}>
        {children}
      </S.Content>
    </S.Wrapper>
  );
};
