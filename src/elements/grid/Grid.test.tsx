/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Grid from './Grid'

describe('Grid Component', () => {
  it('render the container', () => {
    const wrapper = shallow(<Grid>container</Grid>)
    expect(wrapper.html()).toContain('div')
  })
})
