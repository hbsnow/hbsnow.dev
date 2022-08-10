import React, {
  ComponentPropsWithoutRef,
  createElement,
  PropsWithChildren,
  useEffect,
} from "react";

import rehypeShiki from "@leafac/rehype-shiki";
import { imageSize } from "image-size";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  CodeComponent,
  Components,
  HeadingComponent,
} from "react-markdown/src/ast-to-react";
// import gfm from "remark-gfm";
// import remarkSectionize from "remark-sectionize";
// import rehypeStringify from "rehype-stringify";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { getHighlighter } from "shiki";
import unified from "unified";

import Blockcode from "../blockcode/Blockcode";
import Blockquote from "../blockquote/Blockquote";
import Heading from "../heading/Heading";
import ExternalLink from "../link/ExternalLink";
import ResponsiveTable from "../table/ResponsiveTable";
import { htmlToReact } from "./converter";

type Props = Readonly<
  PropsWithChildren<{
    source: string;
  }> &
    Omit<ComponentPropsWithoutRef<"div">, "className">
>;

export const Markdown = (props: Props): JSX.Element | null => {
  const { source } = props;

  return <>{htmlToReact.processSync(source).result}</>;
};

// const Markdown = (props: Props): JSX.Element => {
//   const { source, ...rest } = props;

//   const code: CodeComponent = (props) => {
//     const { inline, children } = props;

//     if (inline) {
//       return <code>{children}</code>;
//     }

//     if (!props.node.properties) {
//       throw new Error("Error: コードに属性は必須です");
//     }

//     const { className: language } = props.node.properties;

//     return <Blockcode language={language as string}>{children}</Blockcode>;
//   };

//   const section = (props: PropsWithChildren<unknown>) => {
//     const { children } = props;

//     return <section>{children}</section>;
//   };

//   const heading: HeadingComponent = (props) => {
//     const { level, children } = props;

//     return <Heading level={level}>{children}</Heading>;
//   };

//   const img: Components["img"] = (props) => {
//     if (!props.node.properties) {
//       throw new Error("Error: 画像に属性は必須です");
//     }

//     const { src, alt } = props.node.properties;

//     const dimensions = imageSize(`public/${src}`);

//     return (
//       <div className="ampImage">
//         <amp-img
//           src={src}
//           alt={alt}
//           layout="intrinsic"
//           width={dimensions.width}
//           height={dimensions.height}
//         />
//         <style jsx>{`
//           .ampImage {
//             max-width: 100%;
//           }
//         `}</style>
//       </div>
//     );
//   };

//   const table = (props: PropsWithChildren<unknown>) => {
//     const { children } = props;

//     return <ResponsiveTable>{children}</ResponsiveTable>;
//   };

//   return (
//     <div data-testid="Markdown" className="markdown" {...rest}>
//       <ReactMarkdown
//         // remarkPlugins={[gfm, remarkSectionize]}
//         rehypePlugins={[rehypeShiki]}
//         components={{
//           code,
//           section,
//           img,
//           h1: heading,
//           h2: heading,
//           h3: heading,
//           h4: heading,
//           h5: heading,
//           h6: heading,
//           a,
//           blockquote,
//           table,
//         }}
//       >
//         {source}
//       </ReactMarkdown>
//     </div>
//   );
// };

// export default Markdown;
