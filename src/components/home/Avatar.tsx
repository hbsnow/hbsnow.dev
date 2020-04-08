import React from 'react'

type Props = {
  size?: number
}

const Avatar: React.FC<Props> = ({ size = 256 }) => {
  return (
    <div className="avatar">
      <amp-img
        alt="hbsnow"
        width={size}
        height={size}
        src="/assets/img/hbsnow.webp"
      >
        <amp-img
          alt="hbsnow"
          fallback=""
          width={size}
          height={size}
          src="/assets/img/hbsnow.jpg"
        ></amp-img>
      </amp-img>
      <style jsx>{`
        .avatar {
          display: flex;
          justify-content: center;
          align-items: center;
          width: calc(256px + var(--gap-size) * 4);
          height: calc(256px + var(--gap-size) * 4);
          background-color: var(--color-default-surface);
          border-radius: 156px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.23);
        }
      `}</style>
    </div>
  )
}

export default Avatar
