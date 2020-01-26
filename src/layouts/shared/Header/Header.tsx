import Link from 'next/link'
import { SerializedStyles, css } from '@emotion/core'
import Container from '../../../components/Container/Container'

const headerStyle = css`
  color: var(--color-primary-text);
  background-color: var(--color-primary-bg);
`

const containerStyle = css`
  display: flex;
  align-items: center;
`

const Header: React.FC<HeaderProps> = ({ styles, ...props }) => {
  return (
    <header css={[headerStyle, styles]} {...props}>
      <Container>
        <div css={containerStyle}>
          <h1>
            <Link href="/">
              <a>hbsnow.dev</a>
            </Link>
          </h1>
          <div css={{ flex: '1 1 auto' }}></div>
          <div>Menu</div>
        </div>
      </Container>
    </header>
  )
}

type HeaderProps = {
  styles?: SerializedStyles
} & JSX.IntrinsicElements['header']

export default Header
