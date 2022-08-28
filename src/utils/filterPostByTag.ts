export const filterPostByTag = <
  T extends {
    frontmatter: {
      tags: string[];
    };
  }
>(
  unfilteredPosts: T[],
  tag: string
) => {
  const posts = unfilteredPosts.filter((post) => {
    return post.frontmatter.tags.includes(tag);
  });

  return posts;
};
