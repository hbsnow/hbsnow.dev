import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";

export const toRem = (val?: number): string => {
  if (!val) return "0";
  return `calc(1.5rem * ${val})`;
};

type Props = Readonly<
  PropsWithChildren<{
    all?: number;
    x?: number;
    y?: number;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  }> &
    Omit<ComponentPropsWithoutRef<"div">, "className">
>;

const Margin = (props: Props): JSX.Element => {
  const { children, all, x, y, top, bottom, left, right } = props;

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
