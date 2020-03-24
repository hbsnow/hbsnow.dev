/* eslint-env jest */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Icon from './Icon'

describe('Icon Component', () => {
  it('render the icon', () => {
    render(<Icon name="github" />)
    expect(screen.getByRole('img')).toHaveAttribute('width', '24')
    expect(screen.getByRole('img')).toHaveAttribute('height', '24')
    expect(screen.getByRole('img')).toHaveAttribute('fill', 'currentColor')
  })

  it('change color', () => {
    render(<Icon name="github" fill="red" />)
    expect(screen.getByRole('img')).toHaveAttribute('width', '24')
    expect(screen.getByRole('img')).toHaveAttribute('height', '24')
    expect(screen.getByRole('img')).toHaveAttribute('fill', 'red')
  })
})
