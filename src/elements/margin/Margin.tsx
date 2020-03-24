import React from 'react'

export const toRem = (val?: number): string => {
  if (!val) return '0'
  return `calc(1.5rem * ${val})`
}

const Margin: React.SFC<MarginProps> = ({
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
    <>
      <div data-testid="Margin" className="margin">
        {children}
      </div>
      <style jsx>{`
        .margin {
          ${topRem ? `margin-top: ${topRem};` : ''};
          ${bottomRem ? `margin-bottom: ${bottomRem};` : ''};
          ${leftRem ? `margin-left: ${leftRem};` : ''};
          ${rightRem ? `margin-right: ${rightRem};` : ''};
        }
      `}</style>
    </>
  )
}

export default Margin

type MarginProps = {
  all?: number
  x?: number
  y?: number
  top?: number
  bottom?: number
  left?: number
  right?: number
} & JSX.IntrinsicElements['div']
