import React from "react";

import Link from "next/link";

import Chip from "../../elements/chip/Chip";
import { TagType } from "../../elements/icon/Icon";
import { useSortedTagList } from "../../hooks/tag";

type Props = Readonly<{
  tagList: TagType[];
  preferredTag?: TagType;
}>;

const TagList = (props: Props): JSX.Element => {
  const { tagList, preferredTag } = props;

  const sortedTagList = useSortedTagList(tagList, preferredTag);

  return (
    <ul className="tagList">
      {sortedTagList?.map((tag) => {
        return (
          <li key={tag} className="tagListItem">
            <Link href={`/blog/tag/${encodeURIComponent(tag)}/`}>
              <a>
                <Chip icon={tag}>{tag}</Chip>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TagList;
