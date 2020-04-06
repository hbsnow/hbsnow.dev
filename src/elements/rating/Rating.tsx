import React from 'react'
// import { containerSize, gapSize } from '../../styles/const'
import classNames from 'classnames'
import Icon from '../icon/Icon'

type Props = {
  rate: number
  maxRate?: number
} & JSX.IntrinsicElements['div']

const Rating: React.FC<Props> = ({ rate, maxRate = 3, ...restProps }) => {
  return (
    <div
      data-testid="Rating"
      className="rating"
      title={`Rate ${rate}`}
      {...restProps}
    >
      {[...Array(maxRate)].map((_, i) => {
        return (
          <div key={i} className={classNames('star', { disable: rate <= i })}>
            <Icon name="star" />
          </div>
        )
      })}

      <style jsx>{`
        .rating {
          display: grid;
          grid-template-columns: repeat(${maxRate}, 1.5rem);
        }
        .star {
          color: var(--color-primary);
        }
        .star.disable {
          color: var(--color-default-text-muted);
          opacity: 0.5;
        }
      `}</style>
    </div>
  )
}

export default Rating
