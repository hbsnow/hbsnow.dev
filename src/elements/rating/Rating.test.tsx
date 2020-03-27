/* eslint-env jest */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Rating from './Rating'

describe('Rating Component', () => {
  it('render the rating', () => {
    render(<Rating rate={1} />)
    expect(screen.getByTestId('Rating')).toHaveAttribute('title', 'Rate 1')
  })
})
