import { renderHook } from "@testing-library/react-hooks";

import { useSortedTagList } from "../tag";

describe(useSortedTagList.name, () => {
  it("sort tag default", () => {
    const { result } = renderHook(() =>
      useSortedTagList(["wordpress", "docker", "svg", "nextjs", "amp"])
    );

    expect(result.current).toEqual([
      "amp",
      "docker",
      "nextjs",
      "svg",
      "wordpress",
    ]);
  });

  it("sort tag with preferredTag", () => {
    const { result } = renderHook(() =>
      useSortedTagList(
        ["wordpress", "docker", "svg", "nextjs", "amp"],
        "nextjs"
      )
    );

    expect(result.current).toEqual([
      "nextjs",
      "amp",
      "docker",
      "svg",
      "wordpress",
    ]);
  });
});
