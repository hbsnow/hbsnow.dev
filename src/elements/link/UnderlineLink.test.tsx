/* eslint-env jest */
import React from 'react'
import { render, screen } from '@testing-library/react'
import UnderlineLink from './UnderlineLink'

describe('UnderlineLink Component', () => {
  it('render the container', () => {
    render(<UnderlineLink href="/">underline link</UnderlineLink>)
    const target = screen.getByRole('link')
    expect(target).toHaveTextContent('underline link')
  })
})
