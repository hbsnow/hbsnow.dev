import Link from 'next/link'
import { SerializedStyles, css } from '@emotion/core'
import Container from '../../../components/Container/Container'

const footerStyle = css`
  color: var(--color-primary-text);
  background-color: var(--color-primary-bg);
`

const containerStyle = css`
  align-items: center;
`

const Footer: React.FC<FooterProps> = ({ children, css, ...props }) => {
  return (
    <footer css={[footerStyle, css]} {...props}>
      <Container>
        <div css={containerStyle}>
          <p>
            このサイト内の記事は
            <Link href="/about">
              <a>hbsnow</a>
            </Link>
            が書いています。
          </p>
          <p>
            何かご意見がございましたら、
            <a href="https://github.com/hbsnow/hbsnow.dev">GitHubのIssue</a>
            までご連絡ください。
          </p>
        </div>

        {children}
      </Container>
    </footer>
  )
}

type FooterProps = {
  css?: SerializedStyles
} & JSX.IntrinsicElements['footer']

export default Footer
