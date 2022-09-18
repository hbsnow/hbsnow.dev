import { feeds } from "../feeds";
import { certification } from "./certification";
import { events } from "./events";

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
