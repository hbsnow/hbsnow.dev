import React from 'react'
import Blockcode from './Blockcode'
import Container from '../container/Container'
import Margin from '../margin/Margin'

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
