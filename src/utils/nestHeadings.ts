import type { MarkdownHeading } from "astro";

type Heading = {
  children?: Heading[];
} & MarkdownHeading;

/**
 * nestを実行する
 */
const nest = (headings: MarkdownHeading[]): Heading[] => {
  const result = headings.reduceRight<Heading[]>((prev, current) => {
    const prevHead = prev.at(0);
    if (prevHead == null) {
      return [current];
    }

    // 階層が同じであれば前に追加する
    if (prevHead.depth === current.depth) {
      return [current, ...prev];
    }

    // 階層が小さくなればwrapする
    if (prevHead.depth > current.depth) {
      const head = prev.shift();
      const prevHead = prev.at(0);

      if (!head) {
        throw new Error();
      }

      // 後ろの配列のdepthが小さい場合には巻き込んでwrapする
      if (prevHead && prevHead.depth > current.depth) {
        // すべてwrapして問題ないケース
        if (prev.every((v) => v.depth > current.depth)) {
          return [{ ...current, children: [head, ...prev] }];
        }

        const index = prev.findIndex((v) => v.depth <= current.depth);
        const rest = prev.splice(0, index);

        return [{ ...current, children: [head, ...rest] }, ...prev];
      }

      return [{ ...current, children: [head] }, ...prev];
    }

    // 階層が大きくなれば前に追加する
    return [current, ...prev];
  }, []);

  return result;
};

export const nestHeadings = (headings: MarkdownHeading[], depth = 3) => {
  const filtered = headings.filter((heading) => heading.depth <= depth);

  return nest(filtered);
};
