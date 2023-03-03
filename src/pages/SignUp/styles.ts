import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  gap: 23rem;

  .logo {
    width: 50rem;
    height: 50rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  min-width: 25rem;
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2rem;
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-left: auto;
    color: var(--gray-400);
  }
`;
