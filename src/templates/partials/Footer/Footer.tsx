import Link from 'next/link'
import { css } from '@emotion/core'

const Footer = ({ ...restProps }: FooterProps): JSX.Element => {
  const footerStyles = css`
    color: var(--color-primary-text);
    background-color: var(--color-primary-bg);
  `

  return (
    <div css={footerStyles} {...restProps}>
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
  )
}

type FooterProps = {} & JSX.IntrinsicElements['div']

export default Footer
