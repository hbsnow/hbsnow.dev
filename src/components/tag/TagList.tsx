import React from 'react'
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
            <Chip href="/blog/tag/[slug]" as={`/blog/tag/${tag}`} icon={tag}>
              {tag}
            </Chip>
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
