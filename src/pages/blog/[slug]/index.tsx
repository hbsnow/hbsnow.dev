import React from "react";

import { NextPage, GetStaticProps } from "next";

import BlogHeader from "../../../components/blog/BlogHeader";
import Meta from "../../../components/head/Meta";
import Container from "../../../elements/container/Container";
import Margin from "../../../elements/margin/Margin";
import Markdown from "../../../elements/markdown/Markdown";
import { BlogType, loadBlog, loadBlogList } from "../../../modules/blog";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import { toSlugString } from "../../../utils/url";

export const config = { amp: true };

type Props = {
  readonly blog: BlogType;
};

const Page: NextPage<Props> = ({ blog }) => {
  return (
    <>
      <Meta
        type="blog"
        title={`${blog.data.title} | hbsnow.dev`}
        path={`/blog/${blog.slug}/`}
        description={blog.data.description}
        createdAt={blog.data.createdAt}
        updatedAt={blog.data?.updatedAt}
      />
      <DefaultTemplate>
        <Container>
          <Margin bottom={6}>
            <article>
              <BlogHeader post={blog.data} />
              <Markdown source={blog.content} />
            </article>
          </Margin>
        </Container>
      </DefaultTemplate>
    </>
  );
};

export const getStaticPaths = (): {
  fallback: boolean;
  paths: string[];
} => {
  const blogList = loadBlogList();

  return {
    fallback: false,
    paths: blogList.map((blog) => `/blog/${blog.slug}/`),
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<{ props: Props }> => {
  const blog = await loadBlog(toSlugString(params?.slug ?? []));

  return { props: { blog } };
};

export default Page;
