import { css, SerializedStyles } from '@emotion/core'
import { containerSize } from '../../styles/const'

const Container: React.FC<ContainerProps> = ({
  children,
  styles,
  size = 'md',
}) => {
  const containerStyles = css`
    display: grid;
    width: 100%;
    grid-template-columns: minmax(0, 1fr) minmax(auto, ${containerSize[size]}) 5fr;
    gap: 0.5rem;
  `
  return (
    <div css={[containerStyles, styles]}>
      <div></div>
      <div>{children}</div>
      <div></div>
    </div>
  )
}

type ContainerProps = {
  styles?: SerializedStyles
  size?: 'xs' | 'sm' | 'md' | 'lg'
} & JSX.IntrinsicElements['div']

export default Container
