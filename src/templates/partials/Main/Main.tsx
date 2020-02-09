import { css } from '@emotion/core'

const Main: React.FC<MainProps> = ({ children, ...restProps }) => {
  const mainStyles = css``

  return (
    <main css={mainStyles} {...restProps}>
      {children}
    </main>
  )
}

type MainProps = {} & JSX.IntrinsicElements['main']

export default Main
