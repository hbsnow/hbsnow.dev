import { memo, useMemo } from "react";

import styles from "./ActivityList.module.css";
import { ActivityListItem } from "./ActivityListItem";
import type { Activity } from "@/data/activities";
import { chunkByYear } from "@/utils/chunkByYear";
import { sortActivityByDate } from "@/utils/sortActivityByDate";

type Props = {
  activities: Activity[];
};

const Component = (props: Props): JSX.Element => {
  const { activities } = props;

  const sorted = useMemo(() => sortActivityByDate(activities), [activities]);
  const chunked = useMemo(() => Array.from(chunkByYear(sorted)), [sorted]);

  return (
    <div role="list">
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
