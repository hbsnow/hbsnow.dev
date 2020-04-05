import React from 'react'
import Link, { LinkProps } from 'next/link'
import css from 'styled-jsx/css'
import ExternalLink from '../link/ExternalLink'

const button = css`
  .button {
    background-color: var(--color-default-surface);
    vertical-align: middle;
    user-select: none;
    -webkit-appearance: none;
  }

  .button:hover {
    cursor: pointer;
  }
`

const isLinkType = (props): props is LinkProps => props?.href !== undefined

const Button: React.FC<ButtonProps | LinkProps> = (props) => {
  if (isLinkType(props)) {
    const { children, href, ...restProps } = props
    const isExternal = href.toString().startsWith('http')
    return isExternal ? (
      <ExternalLink href={href.toString()} {...restProps}>
        <div className="button">{children}</div>
        <style jsx>{button}</style>
      </ExternalLink>
    ) : (
      <Link href={href} {...restProps}>
        <a className="button">
          {children}
          <style jsx>{button}</style>
        </a>
      </Link>
    )
  }

  const { children, type = 'button', ...restProps } = props
  return (
    <button className="button" type={type} {...restProps}>
      {children}
      <style jsx>{button}</style>
    </button>
  )
}

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
} & JSX.IntrinsicElements['button']

export default Button
