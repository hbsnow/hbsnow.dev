import { BlogType } from "../blog";

export const loadBlogList = (): BlogType[] => [
  {
    slug: "test1",
    title: "test1 title",
    tags: ["test1-1", "test1-2"],
    description: "test1 description",
    createdAt: "2019-06-01T00:00:00.000Z",
    updatedAt: "2019-07-26T00:00:00.000Z",
  },
  {
    slug: "test2",
    title: "test2 title",
    tags: ["2-1"],
    description: "test1 description",
    createdAt: "2018-05-12T00:00:00.000Z",
  },
  {
    slug: "test3",
    title: "test3 title",
    tags: ["3-1"],
    description: "test3 description",
    createdAt: "2018-05-11T00:00:00.000Z",
    updatedAt: "2019-10-02T00:00:00.000Z",
  },
];
