import { configure, addParameters } from '@storybook/react'

addParameters({
  options: {
    storySort: (a, b) => {
      // Welcomeのページを一番上にしたい
      if (a[1].kind === 'Welcome') {
        return -1
      }

      // 他のストーリーをID順にソート
      // https://github.com/storybookjs/storybook/issues/548#issuecomment-530305279
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true })
    },
  },
})

const req = require.context('../src/elements', true, /(.stories.tsx$)/)

configure(req, module)
