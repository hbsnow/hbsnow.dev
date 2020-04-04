import React from 'react'
import classNames from 'classnames'
import { BlogType } from '../../modules/blog'
import { useFormattedDate } from '../../hooks/date'

const BlogHeader: React.FC<BlogHeaderProps> = ({ post, ...restProps }) => {
  const createdAt = useFormattedDate(post.createdAt)
  const updatedAt = useFormattedDate(post.updatedAt)

  return (
    <header
      className={classNames('header', {
        update: Boolean(post.updatedAt),
      })}
      {...restProps}
    >
      <div className="date">
        <div className="createdAt">
          <time dateTime={createdAt}>{createdAt}</time>
        </div>
        {updatedAt && (
          <div className="updatedAt">
            <time dateTime={updatedAt}>{updatedAt}</time>
          </div>
        )}
      </div>
      <h1>{post.title}</h1>
      <style jsx>{`
        .date {
          display: flex;
          margin-bottom: var(--gap-size);
        }

        .createdAt,
        .updatedAt {
          font-size: 0.75rem;
          margin-right: var(--gap-size);
        }

        .header.update .createdAt {
          color: var(--color-default-text-muted);
        }
      `}</style>
    </header>
  )
}

type BlogHeaderProps = {
  post: BlogType
} & JSX.IntrinsicElements['header']

export default BlogHeader
