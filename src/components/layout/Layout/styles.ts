import styled from 'styled-components';

import type { LayoutProps } from '.';

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.section<Omit<LayoutProps, 'children'>>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ dir }) => dir};

  justify-content: center;
  align-items: flex-start;

  gap: ${({ gap }) => gap ?? 0};
  margin: 4rem 11.2rem auto;
`;
