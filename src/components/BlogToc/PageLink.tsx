import { useInView } from "./useInView";
import type { nestHeadings } from "@/utils/nestHeadings";

type Props = {
  heading: ReturnType<typeof nestHeadings>[number];
};

const threshold = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

export const PageLink = (props: Props): JSX.Element | null => {
  const { heading } = props;

  const inView = useInView(heading, { threshold });

  return (
    <a href={`#${heading.slug}`} data-in-view={inView}>
      {heading.text}
    </a>
  );
};
