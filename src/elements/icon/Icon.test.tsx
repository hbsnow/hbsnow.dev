/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Icon from './Icon'

describe('Icon Component', () => {
  it('render the github icon', () => {
    const wrapper = shallow(<Icon name="github" />)
    expect(wrapper.html()).toContain('svg')
  })

  it('render the twitter icon', () => {
    const wrapper = shallow(<Icon name="twitter" />)
    expect(wrapper.html()).toContain('svg')
  })
})
