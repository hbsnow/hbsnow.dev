import css from 'styled-jsx/css'
import { colors, gapSize } from './const'
import { textColor } from './mixin'

const globalStyles = css.global`
  :root {
    --color-default-bg: ${colors.bg.light};
    --color-default-surface: ${colors.surface.light};
    --color-default-text: ${textColor(colors.bg.light)};
    --color-default-text-muted: ${textColor(colors.bg.light, 'textMuted')};
    --color-default-divider: ${colors.divider.light};
    --color-primary: ${colors.primary.light};
    --color-primary-text: ${textColor(colors.primary.light)};
    --color-primary-variant-bg: ${colors.primaryVariant.light};
    --color-primary-variant-text: ${textColor(colors.primaryVariant.light)};
    --font-family-default: sans-serif;
    --font-family-code: '_', monospace;
    --gap-size: ${gapSize};
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-default-bg: ${colors.bg.dark};
      --color-default-surface: ${colors.surface.dark};
      --color-default-text: ${textColor(colors.bg.dark)};
      --color-default-text-muted: ${textColor(colors.bg.dark, 'textMuted')};
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
  body {
    margin: 0;
    padding: 0;
  }

  body {
    color: var(--color-default-text);
    background-color: var(--color-default-bg);
    font-family: sans-serif;
    line-height: 1.5;
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
  dl,
  dd,
  table,
  pre {
    margin: 0 0 calc(var(--gap-size) * 2);
    padding: 0;
  }

  ul,
  ol {
    margin: 0 0 calc(var(--gap-size) * 2) calc(var(--gap-size) * 2);
    padding: 0;
  }

  li {
    margin: 0 0 var(--gap-size);
    padding: 0;
  }

  a {
    display: inline-block;
    color: var(--color-primary);
    text-decoration: none;
  }

  img,
  svg {
    vertical-align: bottom;
  }

  pre {
    font-family: var(--font-family-code);
    font-size: 1em;
    overflow-wrap: break-word;
    tab-size: 4;
    white-space: pre-wrap;
    word-break: normal;
  }

  code,
  kbd,
  samp {
    font-family: var(--font-family-code);
  }
`

export default globalStyles
