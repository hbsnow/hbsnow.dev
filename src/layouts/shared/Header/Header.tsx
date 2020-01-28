import Link from 'next/link'
import { SerializedStyles, css } from '@emotion/core'
import Container from '../../../components/Container/Container'

const headerCss = css`
  color: var(--color-primary-text);
  background-color: var(--color-primary-bg);
`

const containerCss = css`
  display: flex;
  align-items: center;
`

const Header = ({ css, ...props }: HeaderProps): JSX.Element => {
  return (
    <header css={[headerCss, css]} {...props}>
      <Container>
        <div css={containerCss}>
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
  css?: SerializedStyles
} & JSX.IntrinsicElements['header']

export default Header
