import { css, SerializedStyles } from '@emotion/core'

const containerCss = css`
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 1fr) minmax(auto, 42rem) 5fr;
  gap: 0.5rem;
`

const Container: React.FC<ContainerProps> = ({ children, css }) => {
  return (
    <div css={[containerCss, css]}>
      <div></div>
      <div>{children}</div>
      <div></div>
    </div>
  )
}

type ContainerProps = {
  css?: SerializedStyles
} & JSX.IntrinsicElements['div']

export default Container
