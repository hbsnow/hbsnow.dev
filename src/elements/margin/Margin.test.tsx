/* eslint-env jest */
import React from 'react'

import { render, screen } from '@testing-library/react'

import Margin from './Margin'

describe('Margin Component', () => {
  it('render the margin', () => {
    render(<Margin>margin</Margin>)
    const target = screen.getByTestId('Margin')
    expect(target).toHaveTextContent('margin')
  })
})
