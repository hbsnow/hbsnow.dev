import React from 'react'

import Container from '../container/Container'
import Margin from '../margin/Margin'
import Blockquote from './Blockquote'

export default { title: 'Blockquote' }

export const bloackcode = (): JSX.Element => (
  <Container>
    <Margin all={2}>
      <Blockquote>
        <p>Blockquote</p>
      </Blockquote>
    </Margin>
  </Container>
)
