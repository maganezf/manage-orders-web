import styled from 'styled-components';

export const Listing = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1.6rem;
  gap: 2.4rem;

  width: 100%;
  max-height: 55rem;

  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 1.6rem;

  user-select: none;
`;

export const NewCategoryButton = styled.button`
  margin-left: auto;
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
    font-weight: 700;
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
  overflow-x: hidden;
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  padding: 4rem;
  gap: 1.5rem;

  width: 35rem;
  height: fit-content;

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
`;
