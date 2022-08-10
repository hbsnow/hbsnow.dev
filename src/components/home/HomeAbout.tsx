import React, { PropsWithChildren } from "react";

import Avatar from "./Avatar";

type Props = Readonly<PropsWithChildren<unknown>>;

const HomeAbout = (props: Props): JSX.Element => {
  const { children } = props;

  return (
    <div className="homeAbout">
      <div className="avatarCell">
        <Avatar />
      </div>
      <div className="descriptionCell">
        <div className="description">{children}</div>
      </div>
    </div>
  );
};

export default HomeAbout;
