/* eslint-env jest */
import React from 'react'

import renderer from 'react-test-renderer'

import Code from './Code'

describe(Code.name, () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Code>blockcode</Code>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
