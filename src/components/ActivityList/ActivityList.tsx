import { memo, useMemo, useState, type ComponentProps } from "react";

import styles from "./ActivityList.module.css";
import { ActivityListItem } from "./ActivityListItem";
import { ColoredIcon } from "@/cores/Icon";
import type { Activity } from "@/data/activities";
import { chunkByYear } from "@/utils/chunkByYear";
import { sortActivityByDate } from "@/utils/sortActivityByDate";

type Props = {
  activities: Activity[];
};

const categories: {
  name: string;
  icon: ComponentProps<typeof ColoredIcon>["name"];
}[] = [
  {
    name: "All",
    icon: "file",
  },
  {
    name: "Blog",
    icon: "blog",
  },
  {
    name: "Certification",
    icon: "certification",
  },
  {
    name: "Event",
    icon: "event",
  },
];

const Component = (props: Props): JSX.Element => {
  const { activities } = props;

  const [selected, setSelected] = useState(categories.at(0)?.icon ?? "file");

  const sorted = useMemo(() => sortActivityByDate(activities), [activities]);
  const filtered = useMemo(() => {
    if (selected === "file") {
      return sorted;
    }
    return sorted.filter((activity) => activity.type === selected);
  }, [sorted, selected]);
  const chunked = useMemo(() => Array.from(chunkByYear(filtered)), [filtered]);

  return (
    <div role="list">
      <div className={styles.buttons}>
        {categories.map((category) => (
          <button
            key={category.icon}
            type="button"
            className={styles.button}
            aria-checked={category.icon === selected}
            onClick={() => setSelected(category.icon)}
          >
            <div className={styles.innerButton}>
              <div className={styles.icon}>
                <ColoredIcon name={category.icon} width={20} height={20} />
              </div>
              <span>{category.name}</span>
            </div>
          </button>
        ))}
      </div>
      {chunked.map(([year, activities]) => (
        <section className={styles.item} role="listitem" key={year}>
          <h2 className={styles.title}>{year}</h2>

          <div className={styles.activities} role="list">
            {activities.map((activity) => (
              <div role="listitem" key={`${activity.date}-${activity.title}`}>
                <ActivityListItem activity={activity} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export const ActivityList = memo(Component);
