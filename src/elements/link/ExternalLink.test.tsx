/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import ExternalLink from './ExternalLink'

describe('ExternalLink Component', () => {
  it('render the component', () => {
    const wrapper = shallow(<ExternalLink>ExternalLink</ExternalLink>)
    expect(wrapper.props().target).toEqual('_blank')
    expect(wrapper.html()).toContain('a')
  })

  it('add rel attribute', () => {
    const wrapper = shallow(<ExternalLink rel="rel">ExternalLink</ExternalLink>)
    expect(wrapper.props().rel).toEqual('rel noopener noreferrer')
  })

  it('add rel noopener/noreferrer attribute', () => {
    const wrapper = shallow(
      <ExternalLink rel="noopener noreferrer">ExternalLink</ExternalLink>
    )
    expect(wrapper.props().rel).toEqual('noopener noreferrer')
  })

  it('add rel noopener/noreferrer and other attribute', () => {
    const wrapper = shallow(
      <ExternalLink rel="rel noopener noreferrer">ExternalLink</ExternalLink>
    )
    expect(wrapper.props().rel).toEqual('rel noopener noreferrer')
  })

  it('add other attribute', () => {
    const wrapper = shallow(
      <ExternalLink rel="rel" title="title">
        ExternalLink
      </ExternalLink>
    )
    expect(wrapper.props().rel).toEqual('rel noopener noreferrer')
    expect(wrapper.props().title).toEqual('title')
  })
})
