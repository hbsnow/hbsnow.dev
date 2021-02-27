import { createClient, EntryCollection } from "contentful";

import { IBookFields } from "../models/contentful";

export const fetchBookList = async (): Promise<
  EntryCollection<IBookFields>
> => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID ?? "",
    accessToken: process.env.CONTENTFUL_API_ACCESS_TOKEN ?? "",
  });

  const query = { content_type: "book" };

  const bookList = client.getEntries<IBookFields>(query);

  return bookList;
};
