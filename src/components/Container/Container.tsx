import { css } from '@emotion/core'
import { containerSize } from '../../styles/const'

const Container: React.FC<ContainerProps> = ({ children, size = 'md' }) => {
  const containerStyles = css`
    width: ${containerSize[size]};
  `

  return <div css={containerStyles}>{children}</div>
}

type ContainerProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg'
} & JSX.IntrinsicElements['div']

export default Container
