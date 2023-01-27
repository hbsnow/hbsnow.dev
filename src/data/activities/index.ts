import { certification } from "./certification";
import { events } from "./events";
import { feeds } from "@/data/feeds";

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
      type: "event";
      url: string;
      mediaUrl?: string;
    }
) & { title: string; date: string };

export const activities: Activity[] = [...certification, ...events, ...feeds];
