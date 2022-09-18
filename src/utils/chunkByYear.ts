import type { Activity } from "@/data/activities";

export const chunkByYear = (activities: Activity[]) => {
  const chunked = new Map<number, Activity[]>();

  for (const activity of activities) {
    const year = new Date(activity.date).getFullYear();
    const targetActivity = chunked.get(year) ?? [];
    chunked.set(year, [...targetActivity, activity]);
  }

  return chunked;
};
