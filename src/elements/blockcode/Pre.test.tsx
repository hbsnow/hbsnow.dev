/* eslint-env jest */
import React from 'react'

import { render, screen } from '@testing-library/react'

import Pre from './Pre'

describe('Blockcode Component', () => {
  it('render the pre', () => {
    render(<Pre>pre</Pre>)
    const target = screen.getByTestId('Pre')
    expect(target).toHaveTextContent('pre')
  })
})
