/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Margin from './Margin'

describe('Margin Component', () => {
  it('render the container', () => {
    const wrapper = shallow(<Margin>section</Margin>)
    expect(wrapper.html()).toContain('div')
  })
})
