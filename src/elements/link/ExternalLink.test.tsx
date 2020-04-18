/* eslint-env jest */
import React from 'react'

import { render, screen } from '@testing-library/react'

import ExternalLink from './ExternalLink'

describe('ExternalLink Component', () => {
  it('render the component', () => {
    render(
      <ExternalLink href="https://example.com">external link</ExternalLink>
    )
    const target = screen.getByRole('link')
    expect(target).toHaveTextContent('external link')
    expect(target).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com')
    )
    expect(target).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(target).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    expect(target).toHaveAttribute('target', '_blank')
  })

  it('add rel attribute', () => {
    render(
      <ExternalLink href="https://example.com" rel="rel">
        external link
      </ExternalLink>
    )
    const target = screen.getByRole('link')
    expect(target).toHaveTextContent('external link')
    expect(target).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com')
    )
    expect(target).toHaveAttribute('rel', expect.stringContaining('rel'))
    expect(target).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(target).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    expect(target).toHaveAttribute('target', '_blank')
  })

  it('add rel noopener/noreferrer and other attribute', () => {
    render(
      <ExternalLink href="https://example.com" rel="rel noopener noreferrer">
        external link
      </ExternalLink>
    )
    const target = screen.getByRole('link')
    expect(target).toHaveTextContent('external link')
    expect(target).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com')
    )
    expect(target).toHaveAttribute('rel', expect.stringContaining('rel'))
    expect(target).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(target).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    expect(target).toHaveAttribute('target', '_blank')
  })

  it('add other attribute', () => {
    render(
      <ExternalLink
        href="https://example.com"
        rel="rel noopener noreferrer"
        title="title"
      >
        external link
      </ExternalLink>
    )
    const target = screen.getByRole('link')
    expect(target).toHaveTextContent('external link')
    expect(target).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com')
    )
    expect(target).toHaveAttribute('rel', expect.stringContaining('rel'))
    expect(target).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(target).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    expect(target).toHaveAttribute('title', 'title')
    expect(target).toHaveAttribute('target', '_blank')
  })
})
