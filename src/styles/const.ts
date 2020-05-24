// @link https://material.io/resources/color/#!/?view.left=1&view.right=1&primary.color=559dff&secondary.color=fd9547
export const colors: Readonly<{
  [key: string]: {
    light: string
    dark: string
  }
}> = {
  bg: {
    light: '#fefefe',
    dark: '#2B2842',
  },
  surface: {
    light: 'rgba(0, 0, 0, 0.06)',
    dark: 'rgba(255, 255, 255, 0.08)',
  },
  text: {
    light: 'rgba(0, 0, 0, 0.87)',
    dark: 'rgba(255, 255, 255, 0.87)',
  },
  textMuted: {
    light: 'rgba(0, 0, 0, 0.54)',
    dark: 'rgba(255, 255, 255, 0.49)',
  },
  disabled: {
    light: 'rgba(0, 0, 0, 0.54)',
    dark: 'rgba(255, 255, 255, 0.49)',
  },
  divider: {
    light: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(255, 255, 255, 0.2)',
  },
  primary: {
    light: '#335BC4',
    dark: '#70A5D4',
  },
  primaryVariant: {
    light: '#6F5571',
    dark: '#9C94A8',
  },
  secondary: {
    light: '#CB737B',
    dark: '#CB737B',
  },
  error: {
    light: '#b00020',
    dark: '#cf6679',
  },
}

export const mediaQuery = Object.freeze({
  xs: '(min-width: 36rem)',
  sm: '(min-width: 48rem)',
  md: '(min-width: 62rem)',
  lg: '(min-width: 74rem)',
})

export const containerSize = '48rem'
export const gapSize = 'calc(1.5rem / 2)'
