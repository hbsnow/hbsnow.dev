export const toSlugString = (param: string | string[]): string => {
  if (Array.isArray(param)) {
    return param[0];
  }

  return param;
};
