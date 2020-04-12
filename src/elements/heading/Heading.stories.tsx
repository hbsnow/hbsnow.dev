import React from 'react'
import Heading from './Heading'
import Container from '../container/Container'
import Margin from '../margin/Margin'

export default { title: 'Heading' }

export const heading = (): JSX.Element => (
  <Container>
    <Margin all={2}>
      <Heading level={1}>Heading Level 1</Heading>
    </Margin>
    <Margin all={2}>
      <Heading level={2}>Heading Level 2</Heading>
    </Margin>
    <Margin all={2}>
      <Heading level={3}>Heading Level 3</Heading>
    </Margin>
    <Margin all={2}>
      <Heading level={4}>Heading Level 4</Heading>
    </Margin>
    <Margin all={2}>
      <Heading level={5}>Heading Level 5</Heading>
    </Margin>
    <Margin all={2}>
      <Heading level={6}>Heading Level 6</Heading>
    </Margin>
  </Container>
)
