import React from 'react'

import Container from '../container/Container'
import Margin from '../margin/Margin'
import Blockcode from './Blockcode'

export default { title: 'Blockcode' }

export const bloackcode = (): JSX.Element => (
  <Container>
    <Margin all={2}>
      <Blockcode>Blockcode</Blockcode>
    </Margin>
    <Margin all={2}>
      <Blockcode language="js">Blockcode with language</Blockcode>
    </Margin>
  </Container>
)
