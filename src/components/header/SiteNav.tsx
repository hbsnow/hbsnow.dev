import React from 'react'
import Link from 'next/link'

const SiteNav = ({ ...restProps }: SiteNavProps): JSX.Element => {
  return (
    <div {...restProps}>
      <ul className="list">
        <li>
          <Link href="/blog">
            <a>blog</a>
          </Link>
        </li>
        <li>
          <Link href="/book">
            <a>book</a>
          </Link>
        </li>
      </ul>
      <style jsx>{`
        .list {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin: 0;
        }
        .listItem {
          display: block;
          padding: calc(1.5rem / 2);
        }
      `}</style>
    </div>
  )
}

type SiteNavProps = {} & JSX.IntrinsicElements['div']

export default SiteNav
