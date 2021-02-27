import React, { FC } from "react";

// @todo hooksにすること
export const toRem = (val?: number): string => {
  if (!val) return "0";
  return `calc(1.5rem * ${val})`;
};

type Props = {
  all?: number;
  x?: number;
  y?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
} & Omit<JSX.IntrinsicElements["div"], "className">;

const Margin: FC<Props> = ({
  children,
  all,
  x,
  y,
  top,
  bottom,
  left,
  right,
}) => {
  const topRem = toRem(top ?? y ?? all);
  const bottomRem = toRem(bottom ?? y ?? all);
  const leftRem = toRem(left ?? x ?? all);
  const rightRem = toRem(right ?? x ?? all);

  return (
    <div data-testid="Margin" className="margin">
      {children}
      <style jsx>{`
        .margin {
          ${topRem ? `margin-top: ${topRem};` : ""}
          ${bottomRem ? `margin-bottom: ${bottomRem};` : ""}
          ${leftRem ? `margin-left: ${leftRem};` : ""}
          ${rightRem ? `margin-right: ${rightRem};` : ""}
        }
      `}</style>
    </div>
  );
};

export default Margin;
