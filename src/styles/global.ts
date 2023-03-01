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
    --gray-200: #cccccc;
    --gray-100: #fafafa;

    --white: #ffffff;
  }

  html,
  :root {
    scroll-behavior: smooth;
    font-size: 62.5%; // 10px based
  }

  body {
    background: var(--white);
    font-size: 1.6rem;
    font-family: 'Roboto', sans-serif;

    color-scheme: light dark;

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
    border-radius: 3rem;
    transition: 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }
`}`;
