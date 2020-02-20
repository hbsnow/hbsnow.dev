import { css } from '@emotion/core'
import { containerSize } from '../../styles/const'

const Container: React.FC<ContainerProps> = ({ children, ...restProps }) => {
  const containerStyles = css`
    display: grid;
    width: 100%;
    max-width: ${containerSize};
    grid-template-columns: repeat(8, 1fr);
    gap: calc(1.5rem / 2);
    margin: 0 auto;
  `

  return (
    <div css={containerStyles} {...restProps}>
      {children}
    </div>
  )
}

type ContainerProps = {} & JSX.IntrinsicElements['div']

export default Container
