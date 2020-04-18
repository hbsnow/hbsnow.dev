import React from 'react'

import Container from '../container/Container'
import Margin from '../margin/Margin'
import Button from './Button'

export default { title: 'Button' }

export const button = (): JSX.Element => (
  <Container>
    <Margin all={2}>
      <Button>Button</Button>
    </Margin>
  </Container>
)
