/* eslint-env jest */
import { renderHook } from '@testing-library/react-hooks'

import { useFullPath, useOgpImagePath } from '../url'

describe(useFullPath.name, () => {
  it('test', () => {
    const { result } = renderHook(() => useFullPath('test'))

    expect(result.current).toBe('https://hbsnow.dev/test')
  })

  it('test/', () => {
    const { result } = renderHook(() => useFullPath('test/'))

    expect(result.current).toBe('https://hbsnow.dev/test/')
  })
})

describe(useOgpImagePath.name, () => {
  it('message test', () => {
    const { result } = renderHook(() => useOgpImagePath('test'))

    expect(result.current).toBe(
      'https://hbsnow-og-image.now.sh/test.png?theme=light&md=0&fontSize=100px&images=https%3A%2F%2Fhbsnow.dev%2Fassets%2Fimg%2Fsite-icons%2Ficon.svg'
    )
  })

  it('message test japanese', () => {
    const { result } = renderHook(() => useOgpImagePath('テスト'))

    expect(result.current).toBe(
      'https://hbsnow-og-image.now.sh/%E3%83%86%E3%82%B9%E3%83%88.png?theme=light&md=0&fontSize=100px&images=https%3A%2F%2Fhbsnow.dev%2Fassets%2Fimg%2Fsite-icons%2Ficon.svg'
    )
  })
})
