/* eslint-env jest */
import { renderHook } from "@testing-library/react-hooks";
import { Entry } from "contentful";

import { IBookFields } from "../../models/contentful";
import {
  useMinBookCreatedAt,
  useMaxBookUpdatedAt,
  useSort,
  useGroupByCategory,
} from "../book";

describe(useMinBookCreatedAt.name, () => {
  const fakeBookList = [
    {
      sys: {
        createdAt: "2019-06-01T00:00:00.000Z",
        updatedAt: "2019-07-26T00:00:00.000Z",
      },
    },
    {
      sys: {
        createdAt: "2018-05-10T00:00:00.000Z",
        updatedAt: "2019-10-02T00:00:00.000Z",
      },
    },
    {
      sys: {
        createdAt: "2018-05-10T00:00:00.000Z",
        updatedAt: "2018-05-10T00:00:00.000Z",
      },
    },
  ] as Entry<IBookFields>[];

  it("most old post date", () => {
    const { result } = renderHook(() => useMinBookCreatedAt(fakeBookList));
    expect(result.current).toBe("2018-05-10T00:00:00.000Z");
  });

  it("most new post date", () => {
    const { result } = renderHook(() => useMaxBookUpdatedAt(fakeBookList));
    expect(result.current).toBe("2019-10-02T00:00:00.000Z");
  });
});

describe("sorted book hooks", () => {
  const fakeBookList = [
    {
      fields: {
        isRead: true,
        rate: 3,
        publishedAt: "2000-01-01",
        category: { fields: { slug: "a" } },
      },
    },
    {
      fields: {
        isRead: false,
        rate: 3,
        publishedAt: "2000-01-01",
        category: { fields: { slug: "a" } },
      },
    },
    {
      fields: {
        isRead: true,
        rate: 1,
        publishedAt: "2000-01-01",
        category: { fields: { slug: "a" } },
      },
    },
    {
      fields: {
        isRead: true,
        rate: 1,
        publishedAt: "2000-01-02",
        category: { fields: { slug: "a" } },
      },
    },
    {
      fields: {
        isRead: true,
        rate: 2,
        publishedAt: "2000-01-01",
      },
    },
    {
      fields: {
        isRead: true,
        rate: 2,
        publishedAt: "2000-01-01",
        category: { fields: { slug: "z" } },
      },
    },
    {
      fields: {
        isRead: true,
        rate: 2,
        publishedAt: "2000-01-01",
        category: { fields: { slug: "a" } },
      },
    },
    {
      fields: {
        isRead: false,
        rate: 3,
        publishedAt: "2000-01-02",
        category: { fields: { slug: "a" } },
      },
    },
  ] as Entry<IBookFields>[];

  it("sortBookList", () => {
    const { result } = renderHook(() => useSort(fakeBookList));
    expect(result.current).toEqual([
      {
        fields: {
          isRead: true,
          rate: 3,
          publishedAt: "2000-01-01",
          category: { fields: { slug: "a" } },
        },
      },
      {
        fields: {
          isRead: true,
          rate: 2,
          publishedAt: "2000-01-01",
          category: { fields: { slug: "a" } },
        },
      },
      {
        fields: {
          isRead: true,
          rate: 1,
          publishedAt: "2000-01-02",
          category: { fields: { slug: "a" } },
        },
      },
      {
        fields: {
          isRead: true,
          rate: 1,
          publishedAt: "2000-01-01",
          category: { fields: { slug: "a" } },
        },
      },
      {
        fields: {
          isRead: false,
          rate: 3,
          publishedAt: "2000-01-02",
          category: { fields: { slug: "a" } },
        },
      },
      {
        fields: {
          isRead: false,
          rate: 3,
          publishedAt: "2000-01-01",
          category: { fields: { slug: "a" } },
        },
      },
      {
        fields: {
          isRead: true,
          rate: 2,
          publishedAt: "2000-01-01",
          category: { fields: { slug: "z" } },
        },
      },
      {
        fields: {
          isRead: true,
          rate: 2,
          publishedAt: "2000-01-01",
        },
      },
    ]);
  });
});

describe(useGroupByCategory.name, () => {
  const fakeBookList = [
    {
      fields: {
        isbn: "a-1",
        category: { fields: { slug: "a", title: "title-a" } },
      },
    },
    {
      fields: {
        isbn: "z-1",
        category: { fields: { slug: "z", title: "title-z" } },
      },
    },
    {
      fields: {
        isbn: "none-2",
      },
    },
    {
      fields: {
        isbn: "a-3",
        category: { fields: { slug: "a", title: "title-a" } },
      },
    },
    {
      fields: {
        isbn: "a-2",
        category: { fields: { slug: "a", title: "title-a" } },
      },
    },
    {
      fields: {
        isbn: "none-1",
      },
    },
  ] as Entry<IBookFields>[];

  it("categorized BookList", () => {
    const { result } = renderHook(() => useGroupByCategory(fakeBookList));
    expect(result.current).toEqual([
      {
        slug: "a",
        title: "title-a",
        contents: [
          {
            category: { fields: { slug: "a", title: "title-a" } },
            isbn: "a-1",
          },
          {
            category: { fields: { slug: "a", title: "title-a" } },
            isbn: "a-3",
          },
          {
            category: { fields: { slug: "a", title: "title-a" } },
            isbn: "a-2",
          },
        ],
      },
      {
        slug: "z",
        title: "title-z",
        contents: [
          {
            category: { fields: { slug: "z", title: "title-z" } },
            isbn: "z-1",
          },
        ],
      },
      {
        slug: "uncategorized",
        title: "Uncategorized",
        contents: [{ isbn: "none-2" }, { isbn: "none-1" }],
      },
    ]);
  });
});
