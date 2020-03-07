import React from 'react'
import Link from 'next/link'

const SiteTitle = ({ ...restProps }: SiteTitleProps): JSX.Element => {
  return (
    <div {...restProps}>
      <h1 className="siteTitle">
        <Link href="/">
          <a>
            <div className="title">hbsnow.dev</div>
          </a>
        </Link>
      </h1>
      <style jsx>{`
        .siteTitle {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
        }
        .title {
          color: inherit;
        }
      `}</style>
    </div>
  )
}

type SiteTitleProps = {} & JSX.IntrinsicElements['div']

export default SiteTitle
