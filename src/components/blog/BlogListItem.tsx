import React from 'react'
import { BlogType } from '../../modules/blog'
import Link from 'next/link'
import { useFormattedDate } from '../../hooks/date'
import classNames from 'classnames'
import { mediaQuery } from '../../styles/const'
import TagList from '../tag/TagList'

const BlogListItem: React.FC<BlogListItemProps> = ({ post, ...restProps }) => {
  const createdAt = useFormattedDate(post.createdAt)
  const updatedAt = useFormattedDate(post.updatedAt)

  return (
    <div
      className={classNames('blogListItem', { update: Boolean(updatedAt) })}
      {...restProps}
    >
      <div className="title">
        <Link href="/blog/[slug]" as={`/blog/${post.slug}`}>
          <a>{post.title}</a>
        </Link>
      </div>
      <div className="separator">
        <hr className="line" />
      </div>
      {updatedAt && (
        <div className="updatedAt">
          <time dateTime={post.updatedAt}>{updatedAt}</time>
        </div>
      )}
      <div className="createdAt">
        <time dateTime={post.createdAt}>{createdAt}</time>
      </div>
      <div className="tags">
        <TagList tagList={post.tags} />
      </div>
      <style jsx>{`
        .blogListItem {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: repeat(3, auto);
          gap: var(--gap-size);
        }

        .title {
          grid-column: 1 / 3;
          grid-row: 2 / 3;
        }

        .separator {
          display: flex;
          align-items: center;
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }

        .line {
          width: 100%;
          border-style: solid;
          border-image: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0) 0%,
              var(--color-default-divider) 8rem,
              var(--color-default-divider) 100%
            )
            1 / 0 0 1px;
          margin: 0 var(--gap-size);
        }

        .createdAt,
        .updatedAt {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.75rem;
          padding-left: 0;
          grid-row: 1 / 2;
        }

        .createdAt {
          grid-column: 2 / 3;
        }

        .updatedAt {
          grid-column: 3 / 4;
        }

        .tags {
          grid-row: 3 / 4;
          grid-column: 1 / 4;
        }

        .blogListItem.update {
          grid-template-columns: 1fr auto auto;
        }

        .blogListItem.update .title {
          grid-column: 1 / 4;
        }

        .blogListItem.update .createdAt {
          color: var(--color-default-text-muted);
        }

        @media ${mediaQuery.sm} {
          .blogListItem {
            display: grid;
            grid-template-columns: auto 1fr auto;
            grid-template-rows: auto;
            gap: calc(var(--gap-size) / 2) var(--gap-size);
          }

          .title {
            grid-column: 1 / 2;
            grid-row: 1 / 2;
          }

          .tags {
            grid-row: 2 / 4;
            grid-column: 1 / 5;
          }

          .separator {
            grid-column: 2 / 3;
          }

          .line {
            border: 0;
            border-bottom: 1px solid var(--color-default-divider);
          }

          .createdAt {
            grid-column: 3 / 4;
          }

          .updatedAt {
            grid-column: 4 / 5;
          }

          .blogListItem.update {
            grid-template-columns: auto 1fr auto auto;
          }

          .blogListItem.update .title {
            grid-column: 1 / 2;
          }
        }
      `}</style>
    </div>
  )
}

type BlogListItemProps = {
  post: BlogType
} & JSX.IntrinsicElements['div']

export default BlogListItem
