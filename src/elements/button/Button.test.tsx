/* eslint-env jest */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('Button Component', () => {
  it('render the button', () => {
    render(<Button>button</Button>)
    const target = screen.getByRole('button')
    expect(target).toHaveTextContent('button')
  })

  it('render the submit button', () => {
    render(<Button type="submit">submit button</Button>)
    const target = screen.getByRole('button')
    expect(target).toHaveTextContent('submit button')
    expect(target).toHaveAttribute('type', 'submit')
  })
})
