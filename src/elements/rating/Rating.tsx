import React, { FC } from "react";

import classNames from "classnames";

import Icon from "../icon/Icon";

export type Props = {
  rate: number;
  maxRate?: number;
} & Omit<JSX.IntrinsicElements["div"], "className">;

const Rating: FC<Props> = ({ rate, maxRate = 3, ...rest }) => {
  if (rate > maxRate) {
    throw new Error("rateにmaxRateよりも大きい数値が設定されています。");
  }

  if (rate < 0) {
    throw new Error("rateに負の値が設定されています。");
  }

  return (
    <div
      data-testid="Rating"
      className="rating"
      title={`Rate ${rate}/${maxRate}`}
      {...rest}
    >
      {[...Array(maxRate)].map((_, i) => {
        return (
          <div key={i} className={classNames("star", { disable: rate <= i })}>
            <Icon name="star" />
          </div>
        );
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
  );
};

export default Rating;
