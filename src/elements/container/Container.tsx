import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import { containerSize } from "../../styles/const";

type Props = Readonly<
  PropsWithChildren<unknown> &
    Omit<ComponentPropsWithoutRef<"div">, "className">
>;

const Container = (props: Props): JSX.Element => {
  const { children, ...rest } = props;

  return (
    <div data-testid="Container" className="container" {...rest}>
      <div className="inner">{children}</div>
      <style jsx>{`
        .container {
          display: flex;
          max-width: calc(${containerSize} - 1.5rem);
          margin: 0 auto;
          padding: 0 var(--gap-size);
        }

        .inner {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Container;
