/* eslint-env jest */
import React from 'react'

import renderer from 'react-test-renderer'

import Pre from './Pre'

describe(Pre.name, () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Pre>blockcode</Pre>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
