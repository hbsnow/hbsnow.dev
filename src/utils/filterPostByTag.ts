export const filterPostByTag = <
  T extends {
    data: {
      tags: string[];
    };
  },
>(
  unfilteredPosts: T[],
  tag: string,
) => {
  const posts = unfilteredPosts.filter((post) => {
    return post.data.tags.includes(tag);
  });

  return posts;
};
