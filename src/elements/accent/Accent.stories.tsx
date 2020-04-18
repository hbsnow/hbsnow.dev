import React from 'react'

import Container from '../container/Container'
import Margin from '../margin/Margin'
import Accent from './Accent'

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
