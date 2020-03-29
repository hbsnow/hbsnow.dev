import css from 'styled-jsx/css'

export const styles = css.global`
  /* a11y-light theme */
  /* Based on the Tomorrow Night Eighties theme: https://github.com/isagalaev/highlight.js/blob/master/src/styles/tomorrow-night-eighties.css */
  /* @author: ericwbailey */

  /* Comment */
  .hljs-comment,
  .hljs-quote {
    color: #696969;
  }

  /* Red */
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class,
  .hljs-regexp,
  .hljs-deletion {
    color: #d91e18;
  }

  /* Orange */
  .hljs-number,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params,
  .hljs-meta,
  .hljs-link {
    color: #aa5d00;
  }

  /* Yellow */
  .hljs-attribute {
    color: #aa5d00;
  }

  /* Green */
  .hljs-string,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-addition {
    color: #008000;
  }

  /* Blue */
  .hljs-title,
  .hljs-section {
    color: #007faa;
  }

  /* Purple */
  .hljs-keyword,
  .hljs-selector-tag {
    color: #7928a1;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  @media (prefers-color-scheme: dark) {
    /* a11y-dark theme */
    /* Based on the Tomorrow Night Eighties theme: https://github.com/isagalaev/highlight.js/blob/master/src/styles/tomorrow-night-eighties.css */
    /* @author: ericwbailey */
    .hljs {
      color: #f8f8f2;
    }

    .hljs-comment,
    .hljs-quote {
      color: #d4d0ab;
    }

    /* Red */
    .hljs-variable,
    .hljs-template-variable,
    .hljs-tag,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class,
    .hljs-regexp,
    .hljs-deletion {
      color: #ffa07a;
    }

    /* Orange */
    .hljs-number,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params,
    .hljs-meta,
    .hljs-link {
      color: #f5ab35;
    }

    /* Yellow */
    .hljs-attribute {
      color: #ffd700;
    }

    /* Green */
    .hljs-string,
    .hljs-symbol,
    .hljs-bullet,
    .hljs-addition {
      color: #abe338;
    }

    /* Blue */
    .hljs-title,
    .hljs-section {
      color: #00e0e0;
    }

    /* Purple */
    .hljs-keyword,
    .hljs-selector-tag {
      color: #dcc6e0;
    }
  }
`
