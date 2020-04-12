/* eslint-env jest */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Chip from './Chip'

describe('Chip Component', () => {
  it('render the container', () => {
    render(<Chip>chip</Chip>)
    const target = screen.getByTestId('Chip')
    expect(target).toHaveTextContent('chip')
  })
})
