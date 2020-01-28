import { css, SerializedStyles } from '@emotion/core'

const mainStyle = css``

const Main: React.FC<MainProps> = ({ children, css }) => {
  return <main css={[mainStyle, css]}>{children}</main>
}

type MainProps = {
  css?: SerializedStyles
}

export default Main
