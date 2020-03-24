/* eslint-env jest */
import { renderHook } from '@testing-library/react-hooks'
import { useFormattedDate } from '../date'

describe('date hooks', () => {
  it('formatted date', () => {
    const { result } = renderHook(() =>
      useFormattedDate('2019-06-01T00:00:00.000Z')
    )

    expect(result.current).toEqual('2019-06-01')
  })
})
