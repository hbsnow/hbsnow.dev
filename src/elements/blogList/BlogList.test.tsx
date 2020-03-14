/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import BlogList from './BlogList'

describe('BlogList Component', () => {
  it('render the container', () => {
    const wrapper = shallow(<BlogList>container</BlogList>)
    expect(wrapper.html()).toContain('div')
  })
})
