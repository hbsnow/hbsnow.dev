/* eslint-env jest */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Rating from './Rating'

describe('Rating Component', () => {
  it('render the rating', () => {
    render(<Rating rate={1} />)
    const target = screen.getByTestId('Rating')
    expect(target).toHaveAttribute('title', 'Rate 1/3')
  })

  it('render rate 2 and maxRate 5', () => {
    render(<Rating rate={2} maxRate={5} />)
    const target = screen.getByTestId('Rating')
    expect(target).toHaveAttribute('title', 'Rate 2/5')
  })

  it('if rate 4 and maxRate 3, expect throw error', () => {
    expect(() => render(<Rating rate={4} />)).toThrowError(Error)
  })

  it('if rate 11 and maxRate 10, expect throw error', () => {
    expect(() => render(<Rating rate={11} maxRate={10} />)).toThrowError(Error)
  })
})
