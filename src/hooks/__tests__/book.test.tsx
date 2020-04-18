/* eslint-env jest */
import { renderHook } from '@testing-library/react-hooks'
import { Entry } from 'contentful'

import { IBookFields } from '../../models/contentful'
import { useMinBookCreatedAt, useMaxBookUpdatedAt } from '../book'

describe('book hooks', () => {
  const fakeBookList = [
    {
      sys: {
        createdAt: '2019-06-01T00:00:00.000Z',
        updatedAt: '2019-07-26T00:00:00.000Z',
      },
    },
    {
      sys: {
        createdAt: '2018-05-10T00:00:00.000Z',
        updatedAt: '2019-10-02T00:00:00.000Z',
      },
    },
    {
      sys: {
        createdAt: '2018-05-10T00:00:00.000Z',
        updatedAt: '2018-05-10T00:00:00.000Z',
      },
    },
  ] as Entry<IBookFields>[]

  it('most old post date', () => {
    const { result } = renderHook(() => useMinBookCreatedAt(fakeBookList))
    expect(result.current).toBe('2018-05-10T00:00:00.000Z')
  })

  it('most new post date', () => {
    const { result } = renderHook(() => useMaxBookUpdatedAt(fakeBookList))
    expect(result.current).toBe('2019-10-02T00:00:00.000Z')
  })
})
