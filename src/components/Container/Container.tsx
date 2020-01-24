import { css, SerializedStyles } from '@emotion/core'

const Container: React.FC<ContainerProps> = ({ children, cssProps }) => {
  const container = css(
    {
      width: '100%',
      maxWidth: '980px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    cssProps
  )
  return <div css={container}>{children}</div>
}

type ContainerProps = {
  cssProps?: SerializedStyles
}

export default Container
