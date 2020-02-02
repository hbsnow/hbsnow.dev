import { css, SerializedStyles } from '@emotion/core'
import Container from '../../../components/Container/Container'

const mainCss = css``

const Main: React.FC<MainProps> = ({ children, css }) => {
  return (
    <main css={[mainCss, css]}>
      <Container>{children}</Container>
    </main>
  )
}

type MainProps = {
  css?: SerializedStyles
}

export default Main
