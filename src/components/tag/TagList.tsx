import React from 'react'
import Chip from '../../elements/chip/Chip'

const TagList: React.FC<TagListProps> = ({ tagList, ...restProps }) => {
  return (
    <ul className="tagList" {...restProps}>
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

type TagListProps = {
  tagList: string[]
} & JSX.IntrinsicElements['ul']

export default TagList
