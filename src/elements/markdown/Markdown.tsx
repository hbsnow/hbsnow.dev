import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import { imageSize } from "image-size";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import remarkSectionize from "remark-sectionize";

import Blockcode from "../blockcode/Blockcode";
import Blockquote from "../blockquote/Blockquote";
import Heading from "../heading/Heading";
import ExternalLink from "../link/ExternalLink";
import ResponsiveTable from "../table/ResponsiveTable";

type Props = PropsWithChildren<{
  source: string;
}> &
  Omit<ComponentPropsWithoutRef<"div">, "className">;

const Markdown = (props: Props): JSX.Element => {
  const { source, ...rest } = props;

  const code = (props: { language: string; value: string }) => {
    const { language, value } = props;

    return <Blockcode language={language}>{value}</Blockcode>;
  };

  const section = (props: PropsWithChildren<unknown>) => {
    const { children } = props;

    return <section>{children}</section>;
  };

  const heading = (props: PropsWithChildren<{ level: string }>) => {
    const { level, children } = props;

    return <Heading level={parseInt(level)}>{children}</Heading>;
  };

  const image = (props: PropsWithChildren<{ src: string; alt: string }>) => {
    const { src, alt } = props;

    const dimensions = imageSize(`public/${src}`);

    return (
      <div className="ampImage">
        <amp-img
          src={src}
          alt={alt}
          layout="intrinsic"
          width={dimensions.width}
          height={dimensions.height}
        />
        <style jsx>{`
          .ampImage {
            max-width: 100%;
          }
        `}</style>
      </div>
    );
  };

  const link = (props: PropsWithChildren<{ href: string }>) => {
    const { children, href } = props;

    if (href.startsWith("http")) {
      return <ExternalLink href={href}>{children}</ExternalLink>;
    }
    // SSGなのでLinkでなくても問題なさそう
    return <a href={href}>{children}</a>;
  };

  const blockquote = (props: PropsWithChildren<unknown>) => {
    const { children } = props;

    return <Blockquote>{children}</Blockquote>;
  };

  const table = (props: PropsWithChildren<unknown>) => {
    const { children } = props;

    return <ResponsiveTable>{children}</ResponsiveTable>;
  };

  return (
    <div data-testid="Markdown" className="markdown" {...rest}>
      <ReactMarkdown
        source={source}
        plugins={[gfm, remarkSectionize]}
        renderers={{
          code,
          section,
          heading,
          image,
          link,
          blockquote,
          table,
        }}
      />
    </div>
  );
};

export default Markdown;
