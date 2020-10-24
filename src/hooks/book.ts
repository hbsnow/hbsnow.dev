import { useMemo } from "react";

import { Entry } from "contentful";

import { IBookFields } from "../models/contentful";

export type CategorizedBookType = {
  slug: string;
  title: string;
  contents: Entry<IBookFields>["fields"][];
};

export const useMinBookCreatedAt = (bookList: Entry<IBookFields>[]): string =>
  useMemo(() => {
    return bookList.reduce((prev, current) => {
      if (prev === "") return current.sys.createdAt;
      return prev < current.sys.createdAt ? prev : current.sys.createdAt;
    }, "");
  }, [bookList]);

export const useMaxBookUpdatedAt = (bookList: Entry<IBookFields>[]): string =>
  useMemo(() => {
    return bookList.reduce((prev, current) => {
      if (prev === "") return current.sys.updatedAt;
      return prev > current.sys.updatedAt ? prev : current.sys.updatedAt;
    }, "");
  }, [bookList]);

export const useSort = (bookList: Entry<IBookFields>[]): Entry<IBookFields>[] =>
  useMemo(() => {
    const sortedBookList = [...bookList].sort((a, b) => {
      const slugA = a.fields.category?.fields.slug;
      const slugB = b.fields.category?.fields.slug;
      if (slugA || slugB) {
        if (!slugA) return 1;
        if (!slugB) return -1;
      }
      if (slugA && slugB) {
        if (slugA < slugB) return -1;
        if (slugA > slugB) return 1;
      }

      const rankA = a.fields.isRead ? a.fields.rate : 0;
      const rankB = b.fields.isRead ? b.fields.rate : 0;
      if (rankA < rankB) return 1;
      if (rankA > rankB) return -1;

      const dateA = new Date(a.fields.publishedAt);
      const dateB = new Date(b.fields.publishedAt);
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;

      return 0;
    });

    return sortedBookList;
  }, [bookList]);

export const useGroupByCategory = (
  bookList: Entry<IBookFields>[]
): CategorizedBookType[] => {
  const categorizedBookList: CategorizedBookType[] = [];

  for (const book of bookList) {
    if (!book.fields.category?.fields.slug) {
      if (categorizedBookList.every((book) => book.slug !== "uncategorized")) {
        categorizedBookList.push({
          slug: "uncategorized",
          title: "Uncategorized",
          contents: [book.fields],
        });
        continue;
      }

      categorizedBookList.map((categorizedBook) => {
        if (categorizedBook.slug === "uncategorized") {
          categorizedBook.contents.push(book.fields);
          return book;
        }

        return book;
      });
      continue;
    }

    const slug = book.fields.category.fields.slug;

    if (categorizedBookList.every((book) => book.slug !== slug)) {
      categorizedBookList.push({
        slug,
        title: book.fields.category.fields.title,
        contents: [book.fields],
      });
      continue;
    }

    categorizedBookList.map((categorizedBook) => {
      if (categorizedBook.slug === slug) {
        categorizedBook.contents.push(book.fields);
        return book;
      }

      return book;
    });
  }

  return categorizedBookList;
};
