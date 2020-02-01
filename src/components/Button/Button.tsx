import Link from 'next/link'
import { SerializedStyles, css } from '@emotion/core'

const buttonCss = css``

const isLinkType = (props): props is LinkProps => props?.href !== undefined

const Button: React.FC<ButtonProps | LinkProps> = (props) => {
  if (isLinkType(props)) {
    const { children, css, href, as, amp, ...restProps } = props
    const isExternal = href.startsWith('http')
    return amp || isExternal ? (
      <a href={href} css={[buttonCss, css]} {...restProps}>
        {children}
      </a>
    ) : (
      <Link href={href} {...(as && { as })}>
        <a css={[buttonCss, css]} {...restProps}>
          {children}
        </a>
      </Link>
    )
  }

  const { children, css, ...restProps } = props
  return (
    <button type="button" css={css} {...restProps}>
      {children}
    </button>
  )
}

type LinkProps = {
  css?: SerializedStyles
  href: string
  as?: string
  amp?: boolean
} & JSX.IntrinsicElements['a']

type ButtonProps = {
  css?: SerializedStyles
} & JSX.IntrinsicElements['button']

export default Button
