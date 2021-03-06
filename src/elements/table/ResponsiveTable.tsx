import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  language?: string;
}> &
  Omit<ComponentPropsWithoutRef<"table">, "className">;

const ResponsiveTable = (props: Props): JSX.Element => {
  const { children, ...rest } = props;

  return (
    <div className="responsiveTable">
      <table className="table" {...rest}>
        {children}
      </table>

      <style jsx>{`
        .responsiveTable {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin-bottom: calc(var(--gap-size) * 2);
        }

        .table {
          width: 100%;
          margin-bottom: 1rem;
          color: #212529;
          vertical-align: top;
          border-color: #dee2e6;
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default ResponsiveTable;
