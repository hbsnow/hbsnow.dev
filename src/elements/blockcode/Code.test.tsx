/* eslint-env jest */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Code from './Code'

describe('Blockcode Component', () => {
  it('render the code', () => {
    render(<Code>code</Code>)
    const target = screen.getByTestId('Code')
    expect(target).toHaveTextContent('code')
  })
})
