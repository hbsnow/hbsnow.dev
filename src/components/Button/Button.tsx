import Link from 'next/link'
import { SerializedStyles } from '@emotion/core'

//const cachedStyles = css``

const isLinkType = (props): props is LinkProps => props?.href !== undefined

const Button: React.FC<ButtonProps | LinkProps> = (props) => {
  if (isLinkType(props)) {
    const { children, style, href, as, amp, ...restProps } = props
    const isExternal = href.startsWith('http')
    return amp || isExternal ? (
      <a href={href} css={style} {...restProps}>
        {children}
      </a>
    ) : (
      <Link href={href} {...(as && { as })}>
        <a css={style} {...restProps}>
          {children}
        </a>
      </Link>
    )
  }

  const { children, style, ...restProps } = props
  return (
    <button type="button" css={style} {...restProps}>
      {children}
    </button>
  )
}

type LinkProps = {
  style?: SerializedStyles
  href: string
  as?: string
  amp?: boolean
} & JSX.IntrinsicElements['a']

type ButtonProps = {
  style?: SerializedStyles
} & JSX.IntrinsicElements['button']

export default Button
