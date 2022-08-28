import { Chip } from "../../cores/Chip";
import type { TagType } from "../../cores/Icon";
import { Link } from "../../cores/Link";
import styles from "./styles.module.css";

type Props = Readonly<{
  tags: TagType[];
}>;

export const TagList = (props: Props): JSX.Element | null => {
  const { tags } = props;

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={styles.root}>
      {tags.map((tag) => (
        <Chip
          icon={tag}
          key={tag}
          href={`/blog/tag/${encodeURIComponent(tag)}`}
        >
          {tag}
        </Chip>
      ))}
    </div>
  );
};
