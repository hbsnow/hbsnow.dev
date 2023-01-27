export const sortPostByCreatedAt = <
  T extends {
    data: {
      createdAt: Date;
    };
  }
>(
  unsortedPosts: T[]
) => {
  const posts = unsortedPosts.sort((a, b) => {
    return b.data.createdAt.valueOf() - a.data.createdAt.valueOf();
  });

  return posts;
};
