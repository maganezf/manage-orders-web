import styled from 'styled-components';

export const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 20rem;

  padding: 3rem 11.2rem;

  background: var(--red);
  color: var(--white);
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const RightContent = styled.div`
  display: flex;
  gap: 2.4rem;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: flex-start;

  gap: 0.6rem;

  h5 {
    font-weight: 700;
  }
`;
