import React from 'react'

// @todo hooksにすること
export const toRem = (val?: number): string => {
  if (!val) return '0'
  return `calc(1.5rem * ${val})`
}

type Props = {
  readonly all?: number
  readonly x?: number
  readonly y?: number
  readonly top?: number
  readonly bottom?: number
  readonly left?: number
  readonly right?: number
} & Omit<JSX.IntrinsicElements['div'], 'className'>

const Margin: React.FC<Props> = ({
  children,
  all,
  x,
  y,
  top,
  bottom,
  left,
  right,
}) => {
  const topRem = toRem(top ?? y ?? all)
  const bottomRem = toRem(bottom ?? y ?? all)
  const leftRem = toRem(left ?? x ?? all)
  const rightRem = toRem(right ?? x ?? all)

  return (
    <div data-testid="Margin" className="margin">
      {children}
      <style jsx>{`
        .margin {
          ${topRem ? `margin-top: ${topRem};` : ''}
          ${bottomRem ? `margin-bottom: ${bottomRem};` : ''}
          ${leftRem ? `margin-left: ${leftRem};` : ''}
          ${rightRem ? `margin-right: ${rightRem};` : ''}
        }
      `}</style>
    </div>
  )
}

export default Margin
