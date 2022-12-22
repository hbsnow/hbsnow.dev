import { useEffect, useState } from "react";

import type { nestHeadings } from "@/utils/nestHeadings";

export const useInView = (
  heading: ReturnType<typeof nestHeadings>[number],
  options?: IntersectionObserverInit | undefined
) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("aria-labelledby");
        if (!id) {
          throw new Error(
            "ターゲットにしている要素に aria-labelledby がセットされていません"
          );
        }

        setInView(entry.isIntersecting);
      });
    }, options);
    const targets = document.querySelectorAll(
      `.heading[aria-labelledby="${heading.slug}"]`
    );
    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
    };
  }, [heading.slug]);

  return inView;
};
