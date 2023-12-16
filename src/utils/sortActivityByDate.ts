export const sortActivityByDate = <
  T extends {
    date: string;
  },
>(
  unsortedPosts: T[],
) => {
  const posts = unsortedPosts.sort((a, b) => {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
  });

  return posts;
};
