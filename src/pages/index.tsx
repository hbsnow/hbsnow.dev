import React, { useMemo } from "react";

import { Entry } from "contentful";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

import BlogList from "../components/blog/BlogList";
import Meta from "../components/head/Meta";
import HomeAbout from "../components/home/HomeAbout";
import Accent from "../elements/accent/Accent";
import Container from "../elements/container/Container";
import Icon from "../elements/icon/Icon";
import ExternalLink from "../elements/link/ExternalLink";
import Margin from "../elements/margin/Margin";
import { useSortBlog, useMaxBlogUpdatedAt } from "../hooks/blog";
import { useMaxBookUpdatedAt } from "../hooks/book";
import { IBookFields } from "../models/contentful";
import { BlogType, loadBlogList } from "../modules/blog";
import { fetchBookList } from "../modules/book";
import DefaultTemplate from "../templates/DefaultTemplate";

export const config = { amp: true };

type Props = InferGetStaticPropsType<typeof getStaticProps>;
type StaticProps = {
  blogList: BlogType[];
};

const Page: NextPage<Props> = (props) => {
  const { blogList } = props;

  const sortedBlogList = useSortBlog(blogList);
  const latestBlogList = useMemo(() => {
    return sortedBlogList.slice(0, 3);
  }, [sortedBlogList]);

  const blogUpdatedAt = useMaxBlogUpdatedAt(blogList);

  return (
    <>
      <Meta
        type="article"
        title="hbsnow.dev"
        path="/"
        description="hbsnow の技術メモ置き場を兼ねた実験場。"
        createdAt="2017-12-01"
      />

      <DefaultTemplate>
        <div className="main">
          <div className="section about">
            <Container>
              <Margin y={6}>
                <HomeAbout>
                  <p>札幌ではたらく Front End Developer です。</p>
                  <p>
                    このサイトは{" "}
                    <ExternalLink href="https://nextjs.org/">
                      Next.js
                    </ExternalLink>{" "}
                    で SSG され、ソースコードは{" "}
                    <ExternalLink href="https://github.com/hbsnow/hbsnow.dev">
                      GitHub
                    </ExternalLink>{" "}
                    にて公開されています。
                  </p>
                  <p>
                    Blog の記事にするまでもない簡易な技術メモについては{" "}
                    <ExternalLink href="https://scrapbox.io/hbsnow/">
                      Scrapbox
                    </ExternalLink>{" "}
                    や{" "}
                    <ExternalLink href="https://zenn.dev/hbsnow/scraps">
                      Zenn のスクラップ
                    </ExternalLink>
                    にとっています。
                  </p>
                </HomeAbout>
              </Margin>
            </Container>
          </div>

          <section className="section">
            <Container>
              <Margin y={6}>
                <h2 id="latest-posts">
                  <Accent>Latest Posts</Accent>
                </h2>

                <BlogList blogList={latestBlogList} />

                <Margin y={2}>
                  <div className="allView">
                    <Link href="/blog/">
                      <a className="link">
                        All {blogList.length} Posts <Icon name="arrowRight" />
                      </a>
                    </Link>
                  </div>
                </Margin>
              </Margin>
            </Container>
          </section>
        </div>
      </DefaultTemplate>
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const blogList: BlogType[] = await loadBlogList();

  return {
    props: {
      blogList,
    },
  };
};

export default Page;
