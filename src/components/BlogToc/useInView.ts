import { useEffect, useState } from "react";

import type { nestHeadings } from "@/utils/nestHeadings";

export const useInView = (
  heading: ReturnType<typeof nestHeadings>[number],
  options?: IntersectionObserverInit | undefined,
) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const slug = entry.target.getAttribute("aria-labelledby");
        if (slug == null) {
          throw new Error(
            "ターゲットにしている要素に aria-labelledby がセットされていません",
          );
        }

        setInView(entry.isIntersecting);
      }
    }, options);

    const target = document.querySelector(
      `.heading[aria-labelledby="${heading.slug}"]`,
    );
    if (target) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [heading.slug, options]);

  return inView;
};
