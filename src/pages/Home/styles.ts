import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1.6rem;
  gap: 2.4rem;

  min-width: 38.4rem;
  min-height: 22rem;
  max-height: 55rem;

  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 1.6rem;

  user-select: none;
`;

export const CardTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.8rem;
  gap: 0.8rem;

  min-height: 3.7rem;
  border-radius: 0.8rem;

  .title {
    font-style: normal;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 150%;

    color: var(--gray-500);
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  padding: 4rem 0;
  gap: 0.8rem;

  height: 12.8rem;

  background: var(--white);
  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 0.8rem;

  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 120%;

    color: var(--gray-500);
  }

  .description {
    font-style: normal;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 150%;

    color: var(--gray-400);
  }
`;
