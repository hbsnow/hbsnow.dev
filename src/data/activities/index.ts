import { certification } from "./certification";

export type Activity = (
  | {
      type: "certification";
      category: "aws" | "google-cloud" | "azure";
      url?: string;
    }
  | {
      type: "blog";
      category: "developersio" | "zenn";
      url: string;
    }
  | {
      type: "media";
      category: "youtube";
      url: string;
    }
) & { title: string; date: string };

export const activities: Activity[] = [...certification];
