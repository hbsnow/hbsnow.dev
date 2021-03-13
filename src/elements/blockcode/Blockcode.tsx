import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";

import { mediaQuery } from "../../styles/const";
import Code from "./Code";
import Pre from "./Pre";

export type Props = PropsWithChildren<{
  language?: SyntaxHighlighterProps["language"];
}> &
  Omit<ComponentPropsWithoutRef<"div">, "className">;

const Blockcode = (props: Props): JSX.Element => {
  const { children, language, ...rest } = props;

  return (
    <div data-testid="Blockcode" className="blockcode" {...rest}>
      {language ? (
        <>
          <div className="language">{language}</div>
          <SyntaxHighlighter
            language={language}
            style={false}
            PreTag={Pre}
            CodeTag={Code}
          >
            {children}
          </SyntaxHighlighter>
        </>
      ) : (
        <Pre>
          <Code>{children}</Code>
        </Pre>
      )}

      <style jsx>{`
        .blockcode {
          background-color: var(--color-default-surface);
          font-size: 0.875rem;
          margin-left: calc(var(--gap-size) * -1);
          margin-right: calc(var(--gap-size) * -1);
          margin-bottom: calc(var(--gap-size) * 2);
          padding: calc(var(--gap-size) * 1.5) calc(var(--gap-size));
          ${language ? `padding-top: 0;` : ""}
        }

        .language {
          display: inline-block;
          vertical-align: middle;
          background-color: var(--color-default-surface);
          font-family: var(--font-family-code);
          font-size: 0.75rem;
          margin-bottom: var(--gap-size);
          padding: 0.125rem 0.5rem;
          transform: translateX(-0.5rem);
        }

        @media ${mediaQuery.sm} {
          .blockcode {
            margin-left: calc(var(--gap-size) * -2);
            margin-right: calc(var(--gap-size) * -2);
            padding: calc(var(--gap-size) * 1.5) calc(var(--gap-size) * 2);
            ${language ? `padding-top: 0;` : ""}
          }
        }
      `}</style>
    </div>
  );
};

export default Blockcode;
