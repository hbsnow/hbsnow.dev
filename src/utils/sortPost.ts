export const sortPost = <
  T extends {
    frontmatter: {
      createdAt: string;
    };
  }
>(
  unsortedPosts: T[]
) => {
  const posts = unsortedPosts.sort((a, b) => {
    return (
      new Date(b.frontmatter.createdAt).valueOf() -
      new Date(a.frontmatter.createdAt).valueOf()
    );
  });

  return posts;
};
