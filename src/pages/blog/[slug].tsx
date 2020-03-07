import React from 'react'
import { NextPage } from 'next'
// import matter from 'gray-matter'
// import ReactMarkdown from 'react-markdown'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'

export const config = { amp: true }

const Page: NextPage<PageProps> = ({ slug }) => {
  return (
    <DefaultTemplate>
      <h2>{slug}</h2>
      {/* <ReactMarkdown source={document.content} /> */}
    </DefaultTemplate>
  )
}

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps = async (
  ctx
): Promise<{
  props: PageProps
}> => {
  const { slug } = ctx.param
  console.log(ctx)

  return {
    props: {
      slug,
    },
  }
}

// Page.getInitialProps = async (context): Promise<PageProps> => {
//   const { slug } = context.query

//   if (Array.isArray(slug)) {
//     throw new Error('slugが複数指定されています。')
//   }

//   const content = await import(`../../posts/${slug}.md`)
//   const data = matter(content.default)

//   return {
//     slug,
//     document: data,
//   }
// }

type PageProps = {
  slug?: string
  // document: matter.GrayMatterFile<string>
}

export default Page
