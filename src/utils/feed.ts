import type { AstroMdProps } from "@/types/astro";

export type GlobResult = Record<string, () => Promise<AstroMdProps>>;

export const mapGlobResult = (globResult: GlobResult) => {
  return Promise.all(
    Object.values(globResult).map(async (getInfo) => {
      const info = await getInfo();

      return info;
    })
  );
};
