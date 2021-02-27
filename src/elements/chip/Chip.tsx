import React, { FC } from "react";

import { textColor } from "../../styles/mixin";
import Icon, { tagList, TagType } from "../icon/Icon";

export type Props = {
  icon?: TagType;
} & Omit<JSX.IntrinsicElements["div"], "className">;

const Chip: FC<Props> = ({ children, icon, ...rest }) => {
  return (
    <div data-testid="Chip" className="chip" {...rest}>
      {icon ? (
        <span className="icon">
          <Icon name={icon} width={14} height={14} />
        </span>
      ) : (
        <span className="spacer"></span>
      )}
      <span className="name">{children}</span>
      <span className="spacer"></span>
      <style jsx>{`
        .chip {
          display: inline-flex;
          height: calc(1rem + var(--gap-size));
          justify-content: center;
          align-items: center;
          font-size: 0.75rem;
          background-color: var(--color-default-surface);
          border-radius: calc(1rem + var(--gap-size));
          vertical-align: middle;
        }

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: calc(1rem + var(--gap-size) - 4px);
          height: calc(1rem + var(--gap-size) - 4px);
          border-radius: 50%;
          margin: 0 calc(var(--gap-size) / 2) 0 2px;
          ${icon
            ? `
                color: ${textColor(tagList[icon])};
                background-color: ${tagList[icon]};
              `
            : ""}
        }

        .spacer {
          width: var(--gap-size);
        }
      `}</style>
    </div>
  );
};

export default Chip;
