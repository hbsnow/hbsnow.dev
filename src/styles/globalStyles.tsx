import css from 'styled-jsx/css'
import { colors } from './const'
import { textColor } from './mixin'

const globalStyles = css.global`
  :root {
    --color-default-bg: ${colors.bg.light};
    --color-default-surface: ${colors.surface.light};
    --color-default-text: ${textColor(colors.bg.light)};
    --color-default-divider: ${colors.divider.light};
    --color-primary: ${colors.primary.light};
    --color-primary-text: ${textColor(colors.primary.light)};
    --color-primary-variant-bg: ${colors.primaryVariant.light};
    --color-primary-variant-text: ${textColor(colors.primaryVariant.light)};
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-default-bg: ${colors.bg.dark};
      --color-default-surface: ${colors.surface.dark};
      --color-default-text: ${textColor(colors.bg.dark)};
      --color-default-divider: ${colors.divider.dark};
      --color-primary: ${colors.primary.dark};
      --color-primary-text: ${textColor(colors.primary.dark)};
      --color-primary-variant-bg: ${colors.primaryVariant.dark};
      --color-primary-variant-text: ${textColor(colors.primaryVariant.dark)};
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
    font-family: 'M PLUS Rounded 1c', sans-serif;
    line-height: 1.25;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  li,
  dl,
  dd,
  table {
    margin: 0;
    padding: 0;
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
  }
`

export default globalStyles
