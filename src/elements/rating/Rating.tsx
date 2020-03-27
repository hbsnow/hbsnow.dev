import React from 'react'
// import { containerSize, gapSize } from '../../styles/const'
import classNames from 'classnames'
import Icon from '../icon/Icon'

const Rating: React.FC<RatingProps> = ({ rate, maxRate = 3, ...restProps }) => {
  console.log(rate, maxRate)
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

type RatingProps = {
  rate: number
  maxRate?: number
} & JSX.IntrinsicElements['div']

export default Rating
