import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type NoTargetElement = Readonly<
  PropsWithChildren<unknown> &
    Omit<ComponentPropsWithoutRef<"a">, "target" | "className">
>;

type Props = Readonly<
  {
    disableVisited?: boolean;
  } & NoTargetElement
>;

const addRel = (props: NoTargetElement): NoTargetElement => {
  const rel = props?.rel?.split(" ") || [];
  rel.push(...["noopener", "noreferrer"]);

  return {
    ...props,
    rel: Array.from(new Set(rel)).join(" "),
  };
};

const ExternalLink = (props: Props): JSX.Element => {
  const { children, disableVisited = false, ...rest } = props;

  return (
    <a target="_blank" className="link" {...addRel(rest)}>
      {children}
      <style jsx>{`
        .link {
          ${disableVisited ? `color: var(--color-primary)` : ""}
        }
      `}</style>
    </a>
  );
};

export default ExternalLink;
