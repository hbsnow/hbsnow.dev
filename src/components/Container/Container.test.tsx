/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Container from './Container'

describe('Container Component', () => {
  it('render the container', () => {
    const wrapper = shallow(<Container>container</Container>)
    expect(wrapper.find('div')).toBeTruthy()
  })
})
