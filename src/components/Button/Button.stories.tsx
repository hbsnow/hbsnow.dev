import React from 'react'
import Button from './Button'

export default { title: 'Button' }

export const button = (): JSX.Element => <Button>ボタン</Button>
export const link = (): JSX.Element => (
  <Button href="https://example.com" target="_blank">
    ボタン
  </Button>
)
