import React from 'react'
import Link from 'next/link'
import Chip from '../../elements/chip/Chip'

type Props = {
  tagList: string[]
}

const TagList: React.FC<Props> = ({ tagList }) => {
  return (
    <ul className="tagList">
      {tagList?.map((tag) => {
        return (
          <li key={tag} className="tagListItem">
            <Link href="/blog/tag/[slug]" as={`/blog/tag/${tag}`}>
              <a>
                <Chip icon={tag}>{tag}</Chip>
              </a>
            </Link>
          </li>
        )
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
  )
}

export default TagList
