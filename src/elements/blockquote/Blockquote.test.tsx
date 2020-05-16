/* eslint-env jest */
import React from 'react'

import { render, screen } from '@testing-library/react'

import Blockquote from './Blockquote'

describe('Blockquote Component', () => {
  it('render the blockcode', () => {
    render(<Blockquote>blockquote</Blockquote>)
    const target = screen.getByTestId('Blockquote')
    expect(target).toHaveTextContent('blockquote')
  })
})
