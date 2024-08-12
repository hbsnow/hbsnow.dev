import type { MarkdownHeading } from "astro";

type Heading = {
  children?: Heading[];
} & MarkdownHeading;

/**
 * nestを実行する
 */
export const nestHeadings = (headings: MarkdownHeading[]): Heading[] => {
  const result = headings.reduceRight<Heading[]>((prev, current) => {
    const prevHead = prev.at(0);
    if (prevHead == null) {
      return [current];
    }

    // 階層が同じであれば前に追加する
    if (prevHead.depth === current.depth) {
      return [current].concat(prev);
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
          return [{ ...current, children: [head].concat(prev) }];
        }

        const index = prev.findIndex((v) => v.depth <= current.depth);
        const rest = prev.splice(0, index);
        const result: Heading[] = [{ ...current, children: [head, ...rest] }];

        return result.concat(prev);
      }

      const result: Heading[] = [{ ...current, children: [head] }];
      return result.concat(prev);
    }

    return [current].concat(prev);
  }, []);

  return result;
};
