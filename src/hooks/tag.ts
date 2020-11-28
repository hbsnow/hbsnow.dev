import { useMemo } from "react";

import { TagType } from "../elements/icon/Icon";

export const useSortedTagList = (
  tagList: TagType[],
  preferredTag?: TagType
): TagType[] =>
  useMemo(() => {
    return [...tagList].sort((a, b) => {
      if (a === preferredTag) return -1;
      if (b === preferredTag) return 1;

      return a < b ? -1 : 1;
    });
  }, [preferredTag, tagList]);
