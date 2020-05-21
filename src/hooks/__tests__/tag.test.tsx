/* eslint-env jest */
import { renderHook } from '@testing-library/react-hooks'

import { useSortedTagList } from '../tag'

describe(useSortedTagList.name, () => {
  it('sort tag default', () => {
    const { result } = renderHook(() =>
      useSortedTagList(['zzz', 'z', 'a', 'c', 'bb'])
    )

    expect(result.current).toEqual(['a', 'bb', 'c', 'z', 'zzz'])
  })

  it('sort tag with preferredTag', () => {
    const { result } = renderHook(() =>
      useSortedTagList(['zzz', 'z', 'a', 'c', 'bb'], 'c')
    )

    expect(result.current).toEqual(['c', 'a', 'bb', 'z', 'zzz'])
  })
})
