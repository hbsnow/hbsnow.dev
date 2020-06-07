import React from 'react'

import { Entry } from 'contentful'
import { NextPage, GetStaticProps } from 'next'

import BookList from '../../components/book/BookList'
import Meta from '../../components/head/Meta'
import Container from '../../elements/container/Container'
import Margin from '../../elements/margin/Margin'
import Rating from '../../elements/rating/Rating'
import { useMinBookCreatedAt, useMaxBookUpdatedAt } from '../../hooks/book'
import { IBookFields } from '../../models/contentful'
import { fetchBookList } from '../../modules/book'
import DefaultTemplate from '../../templates/DefaultTemplate'

export const config = { amp: true }

type Props = {
  readonly bookList: Entry<IBookFields>[]
}

const Page: NextPage<Props> = ({ bookList }) => {
  const createdAt = useMinBookCreatedAt(bookList)
  const updatedAt = useMaxBookUpdatedAt(bookList)

  return (
    <>
      <Meta
        type="article"
        title="Book | hbsnow.dev"
        path="/book/"
        description="hbsnow の読んだ本の感想と積んでる本の記録。"
        createdAt={createdAt}
        updatedAt={updatedAt}
      />

      <DefaultTemplate>
        <Container>
          <Margin bottom={6}>
            <Margin bottom={4}>
              <p>
                読んだ本の感想と積んでる本を崩す意思表示としてのリスト。星の表示はおすすめ度、とかではなく自分の読んだ回数と参照する頻度を基準にしています。感想はどんなに長くなっても256文字を超えないようにしたい。
              </p>
              <table>
                <tr>
                  <td>
                    <Rating rate={3} />
                  </td>
                  <td>何度も読み返したり、辞書のようにつかっているような本</td>
                </tr>
                <tr>
                  <td>
                    <Rating rate={2} />
                  </td>
                  <td>数回読んだが、ほとんど読み返すことがない本</td>
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

            <BookList bookList={bookList} />
          </Margin>
        </Container>
      </DefaultTemplate>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props
}> => {
  const bookList = await fetchBookList()

  return {
    props: {
      bookList: bookList?.items ?? [],
    },
  }
}

export default Page
