import React from 'react'
import Link, { LinkProps } from 'next/link'
import ExternalLink from '../link/ExternalLink'

const isLinkType = (props): props is LinkProps => props?.href !== undefined

const Button: React.FC<ButtonProps | LinkProps> = (props) => {
  if (isLinkType(props)) {
    const { children, href, ...restProps } = props
    const isExternal = href.toString().startsWith('http')
    return isExternal ? (
      <ExternalLink href={href.toString()} {...restProps}>
        {children}
      </ExternalLink>
    ) : (
      <Link href={href} {...restProps}>
        <a>{children}</a>
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

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
} & JSX.IntrinsicElements['button']

export default Button
