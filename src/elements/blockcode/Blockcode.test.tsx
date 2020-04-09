/* eslint-env jest */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Blockcode from './Blockcode'
import Code from './Code'
import Pre from './Pre'

describe('Blockcode Component', () => {
  it('render the code', () => {
    render(<Code>code</Code>)
    const target = screen.getByTestId('Code')
    expect(target).toHaveTextContent('code')
  })

  it('render the pre', () => {
    render(<Pre>pre</Pre>)
    const target = screen.getByTestId('Pre')
    expect(target).toHaveTextContent('pre')
  })

  it('render the blockcode', () => {
    render(<Blockcode>blockcode</Blockcode>)
    const target = screen.getByTestId('Blockcode')
    expect(target).toHaveTextContent('blockcode')
  })
})
