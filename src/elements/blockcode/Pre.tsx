import React, { PropsWithChildren } from "react";

import css from "styled-jsx/css";

const styles = css.global`
  /**
   * VS theme by Andrew Lock (https://andrewlock.net)
   * Inspired by Visual Studio syntax coloring
   */
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #008000;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.string {
    color: #a31515;
  }

  .token.punctuation,
  .token.operator {
    color: #393a34; /* no highlight */
  }

  .token.url,
  .token.symbol,
  .token.number,
  .token.boolean,
  .token.variable,
  .token.constant,
  .token.inserted {
    color: #36acaa;
  }

  .token.atrule,
  .token.keyword,
  .token.attr-value,
  .language-autohotkey .token.selector,
  .language-json .token.boolean,
  .language-json .token.number,
  code[class*="language-css"] {
    color: #0000ff;
  }

  .token.function {
    color: #393a34;
  }

  .token.deleted,
  .language-autohotkey .token.tag {
    color: #9a050f;
  }

  .token.selector,
  .language-autohotkey .token.keyword {
    color: #00009f;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.class-name,
  .language-json .token.property {
    color: #2b91af;
  }

  .token.tag,
  .token.selector {
    color: #800000;
  }

  .token.attr-name,
  .token.property,
  .token.regex,
  .token.entity {
    color: #ff0000;
  }

  .token.directive.tag .tag {
    background: #ffff00;
    color: #393a34;
  }

  @media (prefers-color-scheme: dark) {
    .namespace {
      opacity: 0.7;
    }

    .token.doctype .token.doctype-tag {
      color: #569cd6;
    }

    .token.doctype .token.name {
      color: #9cdcfe;
    }

    .token.comment,
    .token.prolog {
      color: #6a9955;
    }

    .token.punctuation,
    .language-html .language-css .token.punctuation,
    .language-html .language-javascript .token.punctuation {
      color: #d4d4d4;
    }

    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.inserted,
    .token.unit {
      color: #b5cea8;
    }

    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.deleted {
      color: #ce9178;
    }

    .language-css .token.string.url {
      text-decoration: underline;
    }

    .token.operator,
    .token.entity {
      color: #d4d4d4;
    }

    .token.operator.arrow {
      color: #569cd6;
    }

    .token.atrule {
      color: #ce9178;
    }

    .token.atrule .token.rule {
      color: #c586c0;
    }

    .token.atrule .token.url {
      color: #9cdcfe;
    }

    .token.atrule .token.url .token.function {
      color: #dcdcaa;
    }

    .token.atrule .token.url .token.punctuation {
      color: #d4d4d4;
    }

    .token.keyword {
      color: #569cd6;
    }

    .token.keyword.module,
    .token.keyword.control-flow {
      color: #c586c0;
    }

    .token.function,
    .token.function .token.maybe-class-name {
      color: #dcdcaa;
    }

    .token.regex {
      color: #d16969;
    }

    .token.important {
      color: #569cd6;
    }

    .token.italic {
      font-style: italic;
    }

    .token.constant {
      color: #9cdcfe;
    }

    .token.class-name,
    .token.maybe-class-name {
      color: #4ec9b0;
    }

    .token.console {
      color: #9cdcfe;
    }

    .token.parameter {
      color: #9cdcfe;
    }

    .token.interpolation {
      color: #9cdcfe;
    }

    .token.punctuation.interpolation-punctuation {
      color: #569cd6;
    }

    .token.boolean {
      color: #569cd6;
    }

    .token.property,
    .token.variable,
    .token.imports .token.maybe-class-name,
    .token.exports .token.maybe-class-name {
      color: #9cdcfe;
    }

    .token.selector {
      color: #d7ba7d;
    }

    .token.escape {
      color: #d7ba7d;
    }

    .token.tag {
      color: #569cd6;
    }

    .token.tag .token.punctuation {
      color: #808080;
    }

    .token.cdata {
      color: #808080;
    }

    .token.attr-name {
      color: #9cdcfe;
    }

    .token.attr-value,
    .token.attr-value .token.punctuation {
      color: #ce9178;
    }

    .token.attr-value .token.punctuation.attr-equals {
      color: #d4d4d4;
    }

    .token.entity {
      color: #569cd6;
    }

    .token.namespace {
      color: #4ec9b0;
    }

    .language-regex .token.anchor {
      color: #dcdcaa;
    }

    .language-html .token.punctuation {
      color: #808080;
    }
  }
`;

type Props = Readonly<PropsWithChildren<unknown>>;

const Pre = (props: Props): JSX.Element => {
  const { children } = props;

  return (
    <pre data-testid="Pre" className="hljs">
      {children}
      <style jsx>{`
        .hljs {
          margin: 0;
        }
      `}</style>
      <style jsx>{styles}</style>
    </pre>
  );
};

export default Pre;
