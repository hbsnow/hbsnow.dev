/**
 * noreferrer がない場合には追加する
 */
export const addRel = (rel: string | undefined): string => {
  const result = rel?.split(" ") || [];
  result.push(...["noreferrer"]);

  return Array.from(new Set(result)).join(" ");
};
