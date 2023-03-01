import { css } from 'styled-components';

const headingFontDefaultConfig = css`
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

const bodyFontDefaultConfig = css`
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

export const typography = css`
  .heading-display {
    font-size: 5.6rem;
    ${headingFontDefaultConfig}
  }

  h1 {
    font-size: 4.8rem;
    ${headingFontDefaultConfig}
  }

  h2 {
    font-size: 4rem;
    ${headingFontDefaultConfig}
  }

  h3 {
    font-size: 3.2rem;
    ${headingFontDefaultConfig}
  }

  h4 {
    font-size: 2.4rem;
    ${headingFontDefaultConfig}
  }

  h5 {
    font-size: 2rem;
    ${headingFontDefaultConfig}
  }

  h5 {
    font-size: 1.6rem;
    ${headingFontDefaultConfig}
  }

  .body-text-lg {
    font-size: 1.8rem;
    ${bodyFontDefaultConfig}
  }

  .body-text-md {
    font-size: 1.6rem;
    ${bodyFontDefaultConfig}
  }

  .body-text-sm {
    font-size: 1.4rem;
    ${bodyFontDefaultConfig}
  }
`;
