import { css, SerializedStyles } from '@emotion/core'

const containerCss = css`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr minmax(auto, 42rem) 1fr;
  gap: 0.5rem;
`

const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return (
    <div css={[containerCss, style]}>
      <div></div>
      <div>{children}</div>
      <div></div>
    </div>
  )
}

type ContainerProps = {
  style?: SerializedStyles
}

export default Container
