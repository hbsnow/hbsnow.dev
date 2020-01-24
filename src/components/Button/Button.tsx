import Link from 'next/link'
import { SerializedStyles } from '@emotion/core'

//const cachedStyles = css``

const isLinkType = (props): props is LinkProps => props?.href !== undefined

const Button: React.FC<ButtonProps | LinkProps> = (props) => {
  if (isLinkType(props)) {
    const { children, href, as, amp, ...restProps } = props
    const isExternal = href.startsWith('http')
    return amp || isExternal ? (
      <a href={href} {...restProps}>
        {children}
      </a>
    ) : (
      <Link href={href} as={as}>
        <a {...restProps}>{children}</a>
      </Link>
    )
  }

  const { children, ...restProps } = props
  return (
    <button type="button" {...restProps}>
      <span>{children}</span>
    </button>
  )
}

type LinkProps = {
  cssProps?: SerializedStyles
  href: string
  as?: string
  amp?: boolean
} & JSX.IntrinsicElements['a']

type ButtonProps = {
  cssProps?: SerializedStyles
} & JSX.IntrinsicElements['button']

export default Button
