import React from 'react'

import { NextPage } from 'next'
import Link from 'next/link'

import Accent from '../elements/accent/Accent'
import Icon from '../elements/icon/Icon'

type Props = {
  readonly statusCode: number
}

const Page: NextPage<Props> = () => {
  return (
    <>
      <div className="root">
        <Accent>
          <h1 className="statusCode">404</h1>
          <div className="description">
            <p>このページにはコンテンツがないようです。</p>
            <p className="link">
              <Link href="/">
                <a>
                  トップページに戻る <Icon name="arrowRight" />
                </a>
              </Link>
            </p>
          </div>
        </Accent>
      </div>
      <style jsx global>{`
        html,
        body,
        #__next {
          height: 100%;
        }
      `}</style>
      <style jsx>{`
        .root {
          display: flex;
          height: 100%;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          overflow: hidden;
        }

        .statusCode {
          text-align: center;
          margin: 0;
          margin-bottom: var(--gap-size);
        }

        .link {
          text-align: right;
        }
      `}</style>
    </>
  )
}

export default Page
