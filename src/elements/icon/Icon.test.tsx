/* eslint-env jest */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Icon from './Icon'

describe('Icon Component', () => {
  it('render the icon', () => {
    render(<Icon name="github" />)
    const target = screen.getByRole('img')
    expect(target).toHaveAttribute('width', '24')
    expect(target).toHaveAttribute('height', '24')
    expect(target).toHaveAttribute('fill', 'currentColor')
  })

  it('change color', () => {
    render(<Icon name="github" fill="red" />)
    const target = screen.getByRole('img')
    expect(target).toHaveAttribute('width', '24')
    expect(target).toHaveAttribute('height', '24')
    expect(target).toHaveAttribute('fill', 'red')
  })
})
