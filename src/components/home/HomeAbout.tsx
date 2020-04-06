import React from 'react'

type Props = {}

const HomeAbout: React.FC<Props> = () => {
  return (
    <div className="homeAbout">
      <div className="avatar">
        <amp-img
          alt="hbsnow"
          width="256"
          height="256"
          src="/assets/img/hbsnow.webp"
        >
          <amp-img
            alt="hbsnow"
            fallback
            width="256"
            height="256"
            src="/assets/img/hbsnow.jpg"
          ></amp-img>
        </amp-img>
      </div>
      <div className="description">
        <p>hbsnowのメモ書き置き場兼実験場。</p>
      </div>

      <style jsx>{`
        .avatar {
          display: flex;
          justify-content: center;
          align-items: center;
          width: calc(256px + var(--gap-size) * 4);
          height: calc(256px + var(--gap-size) * 4);
          background-color: var(--color-default-surface);
          border-radius: 156px;
        }
      `}</style>
    </div>
  )
}

export default HomeAbout
