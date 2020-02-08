import { css, SerializedStyles } from '@emotion/core'

const Container: React.FC<ContainerProps> = ({
  children,
  styles,
  size = 'md',
}) => {
  const containerCss = css`
    display: grid;
    width: 100%;
    grid-template-columns: minmax(0, 1fr) minmax(auto, 42rem) 5fr;
    gap: 0.5rem;
  `
  return (
    <div css={[containerCss, styles]}>
      <div></div>
      <div>{children}</div>
      <div></div>
    </div>
  )
}

type ContainerProps = {
  styles?: SerializedStyles
  size?: 'md' | 'lg'
} & JSX.IntrinsicElements['div']

export default Container
