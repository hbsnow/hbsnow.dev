import React from 'react'
import Accent from './Accent'
import Container from '../container/Container'
import Margin from '../margin/Margin'

export default { title: 'Accent' }

export const accent = (): JSX.Element => (
  <Container>
    <Margin all={2}>
      <Accent>
        <b>Accent</b>
      </Accent>
    </Margin>
  </Container>
)
