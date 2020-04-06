import React from 'react'

type ButtonProps = {} & JSX.IntrinsicElements['button']

const Button: React.FC<ButtonProps> = ({ children, ...restProps }) => {
  return (
    <button className="button" {...restProps}>
      {children}
      <style jsx>{`
        .button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          height: 2rem;
          background-color: var(--color-default-surface);
          vertical-align: middle;
          border-radius: 4px;
          color: inherit;
          text-decoration: none;
          user-select: none;
          -webkit-appearance: none;
          padding: 0 calc(var(--gap-size) * 2);
        }

        .button:hover {
          cursor: pointer;
        }
      `}</style>
    </button>
  )
}

export default Button
