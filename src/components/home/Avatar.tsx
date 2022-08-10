import React from "react";

type Props = Readonly<{
  size?: number;
}>;

const Avatar = (props: Props): JSX.Element => {
  const { size = 256 } = props;

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
    </div>
  );
};

export default Avatar;
