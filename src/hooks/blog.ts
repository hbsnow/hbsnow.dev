import { useMemo } from "react";

import { BlogType } from "../modules/blog";

export const useSortBlog = (blogList: BlogType[]): BlogType[] =>
  useMemo(
    () =>
      blogList.sort((prev, current) =>
        prev.createdAt < current.createdAt ? 1 : -1
      ),
    [blogList]
  );

export const useFilterBlogBy = (
  blogList: BlogType[],
  tagSlug: string
): BlogType[] =>
  useMemo(
    () =>
      blogList.filter((blog) =>
        blog.tags.some((tag: string) => tag === tagSlug)
      ),
    [blogList, tagSlug]
  );

export const useMinBlogCreatedAt = (blogList: BlogType[]): string =>
  useMemo(() => {
    return blogList.reduce((prev, current) => {
      if (prev === "") return current.createdAt;
      return prev < current.createdAt ? prev : current.createdAt;
    }, "");
  }, [blogList]);

export const useMaxBlogUpdatedAt = (blogList: BlogType[]): string =>
  useMemo(() => {
    const maxCreatedDate = blogList.reduce((prev, current) => {
      if (prev === "") return current.createdAt;
      return prev > current.createdAt ? prev : current.createdAt;
    }, "");

    const hoge = blogList.reduce((prev, current) => {
      if (!current?.updatedAt) return prev;
      return prev > current.updatedAt ? prev : current.updatedAt;
    }, maxCreatedDate);

    return hoge;
  }, [blogList]);
