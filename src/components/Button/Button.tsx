import Link from 'next/link'
import { SerializedStyles, css } from '@emotion/core'

const buttonStyles = css``

const isLinkType = (props): props is LinkProps => props?.href !== undefined

const Button: React.FC<ButtonProps | LinkProps> = (props) => {
  if (isLinkType(props)) {
    const { children, styles, href, as, amp, ...restProps } = props
    const isExternal = href.startsWith('http')
    return amp || isExternal ? (
      <a href={href} css={[buttonStyles, styles]} {...restProps}>
        {children}
      </a>
    ) : (
      <Link href={href} {...(as && { as })}>
        <a css={[buttonStyles, styles]} {...restProps}>
          {children}
        </a>
      </Link>
    )
  }

  const { children, styles, ...restProps } = props
  return (
    <button type="button" css={[buttonStyles, styles]} {...restProps}>
      {children}
    </button>
  )
}

type LinkProps = {
  styles?: SerializedStyles
  href: string
  as?: string
  amp?: boolean
} & JSX.IntrinsicElements['a']

type ButtonProps = {
  styles?: SerializedStyles
} & JSX.IntrinsicElements['button']

export default Button
