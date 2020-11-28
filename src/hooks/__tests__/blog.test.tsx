/* eslint-env jest */
import { renderHook } from "@testing-library/react-hooks";

import {
  useSortBlog,
  useFilterBlogBy,
  useMinBlogCreatedAt,
  useMaxBlogUpdatedAt,
} from "../blog";

describe(useSortBlog.name, () => {
  const blog = [
    {
      slug: "test1",
      title: "test1 title",
      tags: ["amp", "anguler"],
      description: "test1 description",
      createdAt: "2019-06-01T00:00:00.000Z",
      updatedAt: "2019-07-26T00:00:00.000Z",
    },
    {
      slug: "test2",
      title: "test2 title",
      tags: ["amp", "firebase"],
      description: "test1 description",
      createdAt: "2018-05-10T00:00:00.000Z",
    },
    {
      slug: "test3",
      title: "test3 title",
      tags: ["go"],
      description: "test3 description",
      createdAt: "2018-05-11T00:00:00.000Z",
      updatedAt: "2019-10-02T00:00:00.000Z",
    },
  ];

  it("order by createdAt desc", () => {
    const { result } = renderHook(() => useSortBlog(blog));
    expect(result.current).toEqual([
      {
        slug: "test1",
        title: "test1 title",
        tags: ["amp", "anguler"],
        description: "test1 description",
        createdAt: "2019-06-01T00:00:00.000Z",
        updatedAt: "2019-07-26T00:00:00.000Z",
      },
      {
        slug: "test3",
        title: "test3 title",
        tags: ["go"],
        description: "test3 description",
        createdAt: "2018-05-11T00:00:00.000Z",
        updatedAt: "2019-10-02T00:00:00.000Z",
      },
      {
        slug: "test2",
        title: "test2 title",
        tags: ["amp", "firebase"],
        description: "test1 description",
        createdAt: "2018-05-10T00:00:00.000Z",
      },
    ]);
  });

  it("filter by tag", () => {
    const { result } = renderHook(() => useFilterBlogBy(blog, "amp"));
    expect(result.current).toEqual([
      {
        slug: "test1",
        title: "test1 title",
        tags: ["amp", "anguler"],
        description: "test1 description",
        createdAt: "2019-06-01T00:00:00.000Z",
        updatedAt: "2019-07-26T00:00:00.000Z",
      },
      {
        slug: "test2",
        title: "test2 title",
        tags: ["amp", "firebase"],
        description: "test1 description",
        createdAt: "2018-05-10T00:00:00.000Z",
      },
    ]);
  });

  it("most old post date", () => {
    const { result } = renderHook(() => useMinBlogCreatedAt(blog));
    expect(result.current).toBe("2018-05-10T00:00:00.000Z");
  });

  it("most new post date", () => {
    const { result } = renderHook(() => useMaxBlogUpdatedAt(blog));
    expect(result.current).toBe("2019-10-02T00:00:00.000Z");
  });
});
