import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'
import { fetchBookList } from '../../modules/book'
import Book from '../../components/book/Book'
import Container from '../../elements/container/Container'
import Margin from '../../elements/margin/Margin'
import Rating from '../../elements/rating/Rating'

export const config = { amp: true }

type Props = {
  bookList: Entry<IBookFields>[]
}

const Page: NextPage<Props> = ({ bookList }) => {
  return (
    <>
      <Head>
        <title>hbsnow.dev</title>
        <meta
          name="description"
          content="hbsnow の読んだ本の感想と積んでる本の記録。"
        />
      </Head>
      <DefaultTemplate>
        <Container>
          <Margin bottom={6}>
            <Margin bottom={4}>
              <p>
                読んだ本の感想と積んでる本を崩す意思表示としてのリスト。星の表示はおすすめ度、とかではなく自分の読んだ回数と頻度を基準にしています。感想はどんなに長くなっても256文字を超えないようにしたい。
              </p>
              <table>
                <tr>
                  <td>
                    <Rating rate={3} />
                  </td>
                  <td>複数回読み返したり、辞書のようにつかっているような本</td>
                </tr>
                <tr>
                  <td>
                    <Rating rate={2} />
                  </td>
                  <td>二回以上読んだが、ほとんど読み返すことがない本</td>
                </tr>
                <tr>
                  <td>
                    <Rating rate={1} />
                  </td>
                  <td>一度しか読んでいない本</td>
                </tr>
                <tr>
                  <td>
                    <Rating rate={0} />
                  </td>
                  <td>積んでる</td>
                </tr>
              </table>
              <p>
                今のところ、このコンテンツ自体作成中なので持っている本をすべて記載できているわけではありません。
              </p>
            </Margin>
            {bookList.map((book) => (
              <Margin key={book.sys.id} bottom={4}>
                <Book book={book} />
              </Margin>
            ))}
          </Margin>
        </Container>
      </DefaultTemplate>
    </>
  )
}

export const getStaticProps = async (): Promise<{
  props: Props
}> => {
  const bookList = await fetchBookList()

  return {
    props: {
      bookList: bookList.items,
    },
  }
}

export default Page
