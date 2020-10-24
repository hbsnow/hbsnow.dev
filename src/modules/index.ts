import { EntryCollection } from "contentful";

import { IBookFields } from "../models/contentful";
import { BlogType } from "./blog";

export type StateType = {
  blogList?: BlogType[];
  bookList?: EntryCollection<IBookFields>;
};
