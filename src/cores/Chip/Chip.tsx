import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import { TagIcon, tagList, TagType } from "../Icon";
import { Link } from "../Link";
import styles from "./styles.module.css";

export type Props = Readonly<
  PropsWithChildren<{
    icon?: TagType;
  }> &
    Omit<ComponentPropsWithoutRef<typeof Link>, "className">
>;

export const Chip = (props: Props): JSX.Element => {
  const { children, icon, ...rest } = props;

  return (
    <Link className={styles.root} {...rest}>
      {icon ? (
        <span
          className={styles.icon}
          style={{
            backgroundColor: tagList[icon],
            color: tagList[icon],
          }}
        >
          <TagIcon name={icon} width={16} height={16} />
        </span>
      ) : (
        <span className={styles.spacer}></span>
      )}
      <span>{children}</span>
      <span className={styles.spacer}></span>
    </Link>
  );
};
