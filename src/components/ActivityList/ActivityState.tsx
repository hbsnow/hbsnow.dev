import { useMemo } from "react";

import { Link } from "@/cores/Link";
import type { Activity } from "@/data/activities";
import { formatDate } from "@/utils/formatDate";

type Props = {
  activity: Activity;
};

export const ActivityState = (props: Props): JSX.Element => {
  const { activity } = props;

  const date = useMemo(
    () => formatDate(activity.date, "MMM D"),
    [activity.date]
  );

  if (activity.type === "blog") {
    switch (activity.category) {
      case "developersio":
        return (
          <span>
            blog at{" "}
            <Link external href="https://dev.classmethod.jp/">
              DevelopersIO
            </Link>{" "}
            on {date}
          </span>
        );

      case "zenn":
        return (
          <span>
            blog at{" "}
            <Link external href="https://zenn.dev/">
              Zenn
            </Link>{" "}
            on {date}
          </span>
        );
    }
  }

  if (activity.type === "certification") {
    return <span>get certified on {date}</span>;
  }

  if (activity.type === "event") {
    return <span>event on {date}</span>;
  }

  throw new Error("type is invalid");
};
