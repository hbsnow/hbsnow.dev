/* eslint-env jest */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Blockcode from './Blockcode'

describe('Blockcode Component', () => {
  it('render the blockcode', () => {
    render(<Blockcode>blockcode</Blockcode>)
    const target = screen.getByTestId('Blockcode')
    expect(target).toHaveTextContent('blockcode')
  })
})
