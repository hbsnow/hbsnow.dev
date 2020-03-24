/* eslint-env jest */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('Button Component', () => {
  it('render the link', () => {
    render(<Button href="/home">button</Button>)
    const target = screen.getByRole('link')
    expect(target).toHaveTextContent('button')
    expect(target).toHaveAttribute('href', '/home')
  })

  it('render the external link', () => {
    render(<Button href="https://example.com">button</Button>)
    const target = screen.getByRole('link')
    expect(target).toHaveTextContent('button')
    expect(target).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com')
    )
    expect(target).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(target).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    expect(target).toHaveAttribute('target', '_blank')
  })

  it('render the button', () => {
    render(<Button>button</Button>)
    const target = screen.getByRole('button')
    expect(target).toHaveTextContent('button')
    expect(target).toHaveAttribute('type', 'button')
  })

  it('render the submit button', () => {
    render(<Button type="submit">submit button</Button>)
    const target = screen.getByRole('button')
    expect(target).toHaveTextContent('submit button')
    expect(target).toHaveAttribute('type', 'submit')
  })
})
