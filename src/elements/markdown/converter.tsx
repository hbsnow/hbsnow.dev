import { createElement } from "react";

import rehypeSection from "@agentofuser/rehype-section";
import rehypePrism from "@mapbox/rehype-prism";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import rehypeStringify from "rehype-stringify";
import rehypeWrapAll from "rehype-wrap-all";
import remarkAutolinkHeading from "remark-autolink-headings";
import remarkCodeTitles from "remark-code-titles";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkSectionize from "remark-sectionize";
import remarkSlug from "remark-slug";
import { getHighlighter } from "shiki";
import { unified } from "unified";

import ResponsiveTable from "../table/ResponsiveTable";
import { Link } from "./Link";

export const markdownToHtml = async (markdown: string) => {
  const result = unified()
    .use(remarkParse)
    .use(remarkCodeTitles)
    .use(remarkSlug)
    .use(remarkAutolinkHeading, {
      behavior: "wrap",
    })
    .use(remarkSectionize)
    .use(remarkRehype)
    .use(rehypeWrapAll, { selector: "pre", wrapper: "div" })
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(markdown);

  return result;
};

export const htmlToReact = unified()
  .use(rehypeParse, { fragment: true })
  // @ts-ignore ライブラリの型が異なるため
  .use(rehypeReact, {
    createElement,
    components: {
      a: Link,
      table: ResponsiveTable,
      // eslint-disable-next-line react/display-name
      // pre: (props: any) => {
      //   console.log(props.children);
      //   return <></>;
      // },
    },
  });
