import { configure, addParameters, addDecorator } from "@storybook/react";
import "normalize.css";
import globalStyles from "../src/styles/globalStyles";

addParameters({
  options: {
    storySort: (a, b) => {
      // ストーリーをID順にソート
      // https://github.com/storybookjs/storybook/issues/548#issuecomment-530305279
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true });
    },
  },
});

addDecorator((storyFn) => (
  <>
    {storyFn()}

    <style jsx global>
      {globalStyles}
    </style>
  </>
));

const req = require.context("../src/elements", true, /(.stories.mdx$)/);

configure(req, module);
