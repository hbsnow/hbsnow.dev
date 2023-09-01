import styles from "./ActivityListItem.module.css";
import { ActivityState } from "./ActivityState";
import { ColoredIcon, SystemIcon } from "@/cores/Icon";
import { Link } from "@/cores/Link";
import type { Activity } from "@/data/activities";

type Props = {
  activity: Activity;
};

export const ActivityListItem = (props: Props): JSX.Element => {
  const { activity } = props;

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <ColoredIcon name={activity.type} width={20} height={20} />
      </div>

      <div>
        <div className={styles.state}>
          <ActivityState activity={activity} />
        </div>
        <div className={styles.activity}>
          {activity.url ? (
            <Link external href={activity.url}>
              {activity.title}
            </Link>
          ) : (
            <span>{activity.title}</span>
          )}
        </div>
        {activity.type === "event" && activity.slide && (
          <Link external href={activity.slide.url} className={styles.slide}>
            <div className={styles.speakerdeck}>
              <SystemIcon name="speakerdeck" width={22} height={22} />
            </div>
            <div>{activity.slide.title}</div>
          </Link>
        )}
      </div>
    </div>
  );
};
