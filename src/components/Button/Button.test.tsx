/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

describe('render button text', () => {
  it('renders the button text', () => {
    const button = shallow(<Button>button</Button>)
    expect(button.find('button').text()).toEqual('button')
  })
})
