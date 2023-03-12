import { createGlobalStyle, css } from 'styled-components';

import { typography } from './typography';

export const GlobalStyles = createGlobalStyle`${css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --red: #d73035;
    --red-dark: #8a1114;
    --red-light: #ffabad;

    --gray-500: #333333;
    --gray-400: #666666;
    --gray-300: #999999;
    --gray-200: #cccccc;
    --gray-100: #fafafa;

    --white: #ffffff;
  }

  html,
  :root {
    scroll-behavior: smooth;
    font-size: 62.5%; // 10px based
  }

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--red);
  }

  body {
    background: var(--white);
    font-size: 1.6rem;
    font-family: 'Roboto', sans-serif;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  ${typography}

  button {
    cursor: pointer;
    border: none;
    transition: 0.2s;

    &:not(:disabled):hover {
      filter: brightness(0.8);
    }

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1.5rem 2.4rem;

    border-radius: 4.8rem;

    color: var(--white);

    &.primary {
      background-color: var(--red);
    }

    &.light {
      background-color: var(--red-light);
    }

    &.outline {
      color: var(--gray-500);
      border: 1px solid var(--gray-500);
      background-color: var(--white);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  input {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    padding: 1.6rem;

    min-width: 34.5rem;
    height: 5.6rem;

    background: var(--white);
    border: 1px solid rgba(204, 204, 204, 0.5);
    border-radius: 0.8rem;

    font-weight: 400;
    font-size: 1.6rem;
    line-height: 150%;

    color: var(--gray-400);
  }
`}`;
