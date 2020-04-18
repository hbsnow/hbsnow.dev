import React from 'react'

import Container from '../container/Container'
import Margin from '../margin/Margin'
import Chip from './Chip'

export default { title: 'Chip' }

export const chip = (): JSX.Element => (
  <Container>
    <Margin all={2}>
      <Chip>Chip</Chip>
    </Margin>
    <Margin all={2}>
      <Chip icon="javascript">Chip with icon</Chip>
    </Margin>
  </Container>
)
