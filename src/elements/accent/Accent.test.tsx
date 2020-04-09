/* eslint-env jest */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Accent from './Accent'

describe('Accent Component', () => {
  it('render the accent', () => {
    render(<Accent>accent</Accent>)
    const target = screen.getByTestId('Accent')
    expect(target).toHaveTextContent('accent')
  })
})
