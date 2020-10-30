import React, { FC } from "react";

type Props = {
  readonly size?: number;
};

const Avatar: FC<Props> = ({ size = 256 }) => {
  return (
    <div className="avatar" data-amp-auto-lightbox-disable>
      <amp-img
        alt="hbsnow"
        width={size}
        height={size}
        src="/assets/img/avatar/hbsnow.webp"
        layout="fixed"
      >
        <amp-img
          alt="hbsnow"
          fallback=""
          width={size}
          height={size}
          src="/assets/img/avatar/hbsnow.png"
          layout="fixed"
        ></amp-img>
      </amp-img>
      <style jsx>{`
        .avatar {
          display: flex;
          justify-content: center;
          align-items: center;
          width: calc(${size}px + var(--gap-size) * 3);
          height: calc(${size}px + var(--gap-size) * 3);
          background-color: var(--color-default-surface);
          border-radius: 50%;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.23);
        }
      `}</style>
    </div>
  );
};

export default Avatar;
