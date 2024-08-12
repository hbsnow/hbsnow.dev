import { memo, useId } from "react";

import styles from "./BlogToc.module.css";
import { PageLink } from "./PageLink";
import { useToc } from "./useToc";
import { SystemIcon } from "@/cores/Icon";
import type { nestHeadings } from "@/utils/nestHeadings";

type Props = {
  headings: ReturnType<typeof nestHeadings>;
  id: string;
};

// 60rem
const wideWidth = 16 * 60;

const Component = (props: Props): JSX.Element | null => {
  const { headings, id } = props;

  const controlsId = useId();

  const [{ button, hidden }, toggle] = useToc(id, wideWidth);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className={styles.root}>
      <h2>
        <button
          type="button"
          aria-label="ページ内の目次"
          aria-expanded="false"
          aria-controls={controlsId}
          onClick={() => button && toggle()}
        >
          <div>
            <SystemIcon name="toc" />
            <span>目次</span>
          </div>
        </button>
      </h2>

      <div className={styles.toc} id={controlsId} aria-hidden={hidden}>
        <ol>
          {headings.map((heading) => (
            <li key={heading.slug}>
              <PageLink heading={heading} tabIndex={hidden ? -1 : 0} />
              {heading.children && (
                <ol>
                  {heading.children.map((child) => (
                    <li key={child.slug}>
                      <PageLink heading={child} tabIndex={hidden ? -1 : 0} />
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export const BlogToc = memo(Component);
