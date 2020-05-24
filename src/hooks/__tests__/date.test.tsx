/* eslint-env jest */
import { renderHook } from '@testing-library/react-hooks'

import { useFormattedDate } from '../date'

describe(useFormattedDate.name, () => {
  it('formatted date default', () => {
    const { result } = renderHook(() =>
      useFormattedDate('2019-06-01T00:00:00.000Z')
    )

    expect(result.current).toEqual('2019-06-01')
  })

  it('if undefined date is empty string', () => {
    const { result } = renderHook(() => useFormattedDate(undefined))

    expect(result.current).toEqual('')
  })

  it('change format', () => {
    const { result } = renderHook(() =>
      useFormattedDate('2019-06-01T00:00:00.000Z', 'YYYY年MM月DD日')
    )

    expect(result.current).toEqual('2019年06月01日')
  })
})
