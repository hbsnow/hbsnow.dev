/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useRef, useState } from 'react'
import { useEvent } from 'react-use'
import styled from '@emotion/styled'
import { SerializedStyles } from '@emotion/core'

const fillCols = (children, cols) => {
  children.forEach((child, i) => cols[i % cols.length].push(child))
}
export const MasonryDiv = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: ${(props) => props.gap || `1em`};
`

export const Col = styled.div`
  display: grid;
`

export default function Masonry({ children, gap, minWidth = 500, ...rest }) {
  const ref = useRef()
  const [numCols, setNumCols] = useState(3)
  const cols = [...Array(numCols)].map(() => [])
  fillCols(children, cols)

  const resizeHandler = () => {
    setNumCols(Math.ceil((ref.current as any).offsetWidth / minWidth))
  }

  useEffect(resizeHandler, [])
  useEvent(`resize`, resizeHandler)

  return (
    <MasonryDiv ref={ref} gap={gap} {...rest}>
      {[...Array(numCols)].map((_, index) => (
        <Col key={index}>{cols[index]}</Col>
      ))}
    </MasonryDiv>
  )
}

type ContainerProps = {
  style?: SerializedStyles
} & JSX.IntrinsicElements['div']
