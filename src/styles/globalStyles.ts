import { css } from '@emotion/core'
import { colors } from './variables'

export const globalStyles = css`
  :root {
    --color-default-bg: ${colors.default.bg.light};
    --color-default-text: ${colors.default.text.light};
    --color-primary-bg: ${colors.primary.bg.light};
    --color-primary-text: ${colors.primary.text.light};
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-default-text: ${colors.default.text.dark};
      --color-default-bg: ${colors.default.bg.dark};
      --color-primary-bg: ${colors.primary.bg.dark};
      --color-primary-text: ${colors.primary.text.dark};
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #__next {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    color: var(--color-default-text);
    background-color: var(--color-default-bg);
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  p,
  ul,
  ol,
  dl,
  table {
    margin: 0 0 1rem;
  }
`
