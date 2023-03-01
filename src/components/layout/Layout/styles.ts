import styled from 'styled-components';

import type { Direction } from '.';

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.main<{ dir: Direction }>`
  display: flex;
  flex-direction: ${({ dir }) => dir};

  width: 100%;
  height: 100%;

  margin: 4rem 11.2rem auto;
`;
