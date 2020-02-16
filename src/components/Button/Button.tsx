import Link from 'next/link'
import { css } from '@emotion/core'

const buttonStyles = css``

const isLinkType = (props): props is LinkProps => props?.href !== undefined

const Button: React.FC<ButtonProps | LinkProps> = (props) => {
  if (isLinkType(props)) {
    const { children, href, as, amp, ...restProps } = props
    const isExternal = href.startsWith('http')
    return amp || isExternal ? (
      <a href={href} css={buttonStyles} {...restProps}>
        {children}
      </a>
    ) : (
      <Link href={href} {...(as && { as })}>
        <a css={buttonStyles} {...restProps}>
          {children}
        </a>
      </Link>
    )
  }

  const { children, ...restProps } = props
  return (
    <button type="button" css={buttonStyles} {...restProps}>
      {children}
    </button>
  )
}

type LinkProps = {
  href: string
  as?: string
  amp?: boolean
} & JSX.IntrinsicElements['a']

type ButtonProps = {} & JSX.IntrinsicElements['button']

export default Button
