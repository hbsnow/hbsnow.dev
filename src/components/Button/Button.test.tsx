/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

describe('Button Component', () => {
  it('render the link', () => {
    const wrapper = shallow(<Button href="/home">button</Button>)
    expect(wrapper.find('Link')).toBeTruthy()
  })

  it('render the external link', () => {
    const wrapper = shallow(<Button href="http://example.com">button</Button>)
    expect(wrapper.find('a')).toBeTruthy()
  })

  it('render the button', () => {
    const wrapper = shallow(<Button>button</Button>)
    expect(wrapper.find('button')).toBeTruthy()
  })
})
