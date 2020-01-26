import { css, SerializedStyles } from '@emotion/core'

const mainStyle = css``

const Main: React.FC<MainProps> = ({ children, style }) => {
  return <main css={[mainStyle, style]}>{children}</main>
}

type MainProps = {
  style?: SerializedStyles
}

export default Main
