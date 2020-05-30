/* eslint-env jest */
import React from 'react'

import renderer from 'react-test-renderer'

import Blockcode from './Blockcode'

describe(Blockcode.name, () => {
  it('components that do not have a language', () => {
    const tree = renderer.create(<Blockcode>blockcode</Blockcode>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('component with language', () => {
    const tree = renderer
      .create(<Blockcode language="test">blockcode</Blockcode>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
