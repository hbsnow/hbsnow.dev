import React from 'react'
import Rating from './Rating'
import Container from '../container/Container'
import Margin from '../margin/Margin'

export default { title: 'Rating' }

export const heading = (): JSX.Element => (
  <Container>
    <Margin all={2}>
      <Rating rate={0} />
    </Margin>
    <Margin all={2}>
      <Rating rate={1} />
    </Margin>
    <Margin all={2}>
      <Rating rate={2} />
    </Margin>
    <Margin all={2}>
      <Rating rate={3} />
    </Margin>
    <Margin all={2}>
      <Rating rate={5} maxRate={10} />
    </Margin>
  </Container>
)
