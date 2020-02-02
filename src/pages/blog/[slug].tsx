/* eslint-disable @typescript-eslint/no-explicit-any */
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'

const Page = ({ document }: PageProps): JSX.Element => {
  return (
    <DefaultTemplate title="Blog">
      <h2>{document.data.title}</h2>
      <ReactMarkdown source={document.content} />
    </DefaultTemplate>
  )
}

type PageProps = {
  slug: string
  document: matter.GrayMatterFile<string>
}

Page.getInitialProps = async (context): Promise<PageProps> => {
  const { slug } = context.query
  const content = await import(`../../posts/${slug}.md`)
  const data = matter(content.default)

  return {
    slug,
    document: data,
  }
}

export default Page
