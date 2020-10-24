import React, { FC } from "react";

import Link from "next/link";

import Chip from "../../elements/chip/Chip";
import { useSortedTagList } from "../../hooks/tag";

type Props = {
  readonly tagList: string[];
  readonly preferredTag?: string;
};

const TagList: FC<Props> = ({ tagList, preferredTag }) => {
  const sortedTagList = useSortedTagList(tagList, preferredTag);

  return (
    <ul className="tagList">
      {sortedTagList?.map((tag) => {
        return (
          <li key={tag} className="tagListItem">
            <Link href="/blog/tag/[slug]/" as={`/blog/tag/${tag}/`}>
              <a>
                <Chip icon={tag}>{tag}</Chip>
              </a>
            </Link>
          </li>
        );
      })}
      <style jsx>{`
        .tagList {
          display: flex;
          flex-wrap: wrap;
          list-style: none;
          margin: calc(var(--gap-size) / 4 * -1);
        }

        .tagListItem {
          margin: calc(var(--gap-size) / 4);
        }
      `}</style>
    </ul>
  );
};

export default TagList;
