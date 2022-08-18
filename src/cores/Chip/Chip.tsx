import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import { Icon, tagList, TagType } from "../Icon";
import styles from "./styles.module.css";

export type Props = Readonly<
  PropsWithChildren<{
    icon?: TagType;
  }> &
    Omit<ComponentPropsWithoutRef<"div">, "className">
>;

export const Chip = (props: Props): JSX.Element => {
  const { children, icon, ...rest } = props;

  return (
    <div className={styles.root} {...rest}>
      {icon ? (
        <span
          className={styles.icon}
          style={{
            backgroundColor: tagList[icon],
            color: tagList[icon],
          }}
        >
          <Icon name={icon} width={16} height={16} />
        </span>
      ) : (
        <span className={styles.spacer}></span>
      )}
      <span>{children}</span>
      <span className={styles.spacer}></span>
    </div>
  );
};
