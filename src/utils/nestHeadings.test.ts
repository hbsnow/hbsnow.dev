import { nestHeadings } from "./nestHeadings";

test("空配列を渡したときには空配列を戻す", () => {
  expect(nestHeadings([])).toEqual([]);
});

test("フラットな構造", () => {
  expect(
    nestHeadings([
      { depth: 1, slug: "slug-1", text: "text-1" },
      { depth: 1, slug: "slug-2", text: "text-2" },
    ]),
  ).toEqual([
    { depth: 1, slug: "slug-1", text: "text-1" },
    { depth: 1, slug: "slug-2", text: "text-2" },
  ]);
});

test("シンプルな1層のネストする構造", () => {
  expect(
    nestHeadings([
      { depth: 1, slug: "slug-1", text: "text-1" },
      { depth: 2, slug: "slug-2", text: "text-2" },
    ]),
  ).toEqual([
    {
      depth: 1,
      slug: "slug-1",
      text: "text-1",
      children: [{ depth: 2, slug: "slug-2", text: "text-2" }],
    },
  ]);
});

test("1層のネストが複数ある構造", () => {
  expect(
    nestHeadings([
      { depth: 1, slug: "slug-1", text: "text-1" },
      { depth: 2, slug: "slug-2", text: "text-2" },
      { depth: 1, slug: "slug-3", text: "text-3" },
    ]),
  ).toEqual([
    {
      depth: 1,
      slug: "slug-1",
      text: "text-1",
      children: [{ depth: 2, slug: "slug-2", text: "text-2" }],
    },
    { depth: 1, slug: "slug-3", text: "text-3" },
  ]);
});

test("シンプルなツリー構造", () => {
  expect(
    nestHeadings([
      { depth: 1, slug: "slug-1", text: "text-1" },
      { depth: 2, slug: "slug-2", text: "text-2" },
      { depth: 3, slug: "slug-3", text: "text-3" },
      { depth: 2, slug: "slug-4", text: "text-4" },
    ]),
  ).toEqual([
    {
      slug: "slug-1",
      text: "text-1",
      depth: 1,
      children: [
        {
          slug: "slug-2",
          text: "text-2",
          depth: 2,
          children: [
            {
              slug: "slug-3",
              text: "text-3",
              depth: 3,
            },
          ],
        },
        {
          slug: "slug-4",
          text: "text-4",
          depth: 2,
        },
      ],
    },
  ]);
});

test("depthが1になるHeadingが2つあるツリー構造", () => {
  expect(
    nestHeadings([
      { depth: 1, slug: "slug-1", text: "text-1" },
      { depth: 2, slug: "slug-2", text: "text-2" },
      { depth: 2, slug: "slug-3", text: "text-3" },
      { depth: 1, slug: "slug-4", text: "text-4" },
      { depth: 2, slug: "slug-5", text: "text-5" },
    ]),
  ).toEqual([
    {
      slug: "slug-1",
      text: "text-1",
      depth: 1,
      children: [
        {
          slug: "slug-2",
          text: "text-2",
          depth: 2,
        },
        {
          slug: "slug-3",
          text: "text-3",
          depth: 2,
        },
      ],
    },
    {
      slug: "slug-4",
      text: "text-4",
      depth: 1,
      children: [
        {
          slug: "slug-5",
          text: "text-5",
          depth: 2,
        },
      ],
    },
  ]);
});

test("depthが1になるHeadingが複数あるツリー構造", () => {
  expect(
    nestHeadings([
      { depth: 1, slug: "slug-1", text: "text-1" },
      { depth: 2, slug: "slug-2", text: "text-2" },
      { depth: 3, slug: "slug-3", text: "text-3" },
      { depth: 2, slug: "slug-4", text: "text-4" },
      { depth: 1, slug: "slug-5", text: "text-5" },
      { depth: 1, slug: "slug-6", text: "text-6" },
      { depth: 2, slug: "slug-7", text: "text-7" },
    ]),
  ).toEqual([
    {
      depth: 1,
      slug: "slug-1",
      text: "text-1",
      children: [
        {
          depth: 2,
          slug: "slug-2",
          text: "text-2",
          children: [
            {
              depth: 3,
              slug: "slug-3",
              text: "text-3",
            },
          ],
        },
        {
          depth: 2,
          slug: "slug-4",
          text: "text-4",
        },
      ],
    },
    {
      depth: 1,
      slug: "slug-5",
      text: "text-5",
    },
    {
      depth: 1,
      slug: "slug-6",
      text: "text-6",
      children: [
        {
          depth: 2,
          slug: "slug-7",
          text: "text-7",
        },
      ],
    },
  ]);
});
