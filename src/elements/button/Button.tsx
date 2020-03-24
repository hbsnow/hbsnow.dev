import React from 'react'
import Link from 'next/link'
import ExternalLink from '../link/ExternalLink'

const isLinkType = (props): props is LinkProps => props?.href !== undefined

const Button: React.FC<ButtonProps | LinkProps> = (props) => {
  if (isLinkType(props)) {
    const { children, href, as, amp, ...restProps } = props
    const isExternal = href.startsWith('http')
    return amp || isExternal ? (
      <ExternalLink href={href} {...restProps}>
        {children}
      </ExternalLink>
    ) : (
      <Link href={href} {...(as && { as })}>
        <a {...restProps}>{children}</a>
      </Link>
    )
  }

  const { children, type = 'button', ...restProps } = props
  return (
    <button type={type} {...restProps}>
      {children}
    </button>
  )
}

type LinkProps = {
  href: string
  as?: string
  amp?: boolean
} & JSX.IntrinsicElements['a']

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
} & JSX.IntrinsicElements['button']

export default Button
