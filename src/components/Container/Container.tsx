import { css, SerializedStyles } from '@emotion/core'

const containerStyle = css`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 0 1rem;
`

const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return <div css={[containerStyle, style]}>{children}</div>
}

type ContainerProps = {
  style?: SerializedStyles
}

export default Container
