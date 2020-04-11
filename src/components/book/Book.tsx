import React from 'react'
import { Entry } from 'contentful'
import { IBookFields } from '../../models/contentful'
import Rating from '../../elements/rating/Rating'

type Props = {
  book: Entry<IBookFields>
}

const Book: React.FC<Props> = ({ book }) => {
  return (
    <div className="book">
      <header className="header">
        <h3 className="name">{book.fields.name}</h3>
      </header>

      <div className="rate">
        <Rating rate={book.fields.rate} />
      </div>

      <div className="body">{book.fields.body}</div>
      <style jsx>{`
        .book {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: repeat(2, auto);
          gap: var(--gap-size);
        }

        .header {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }

        .rate {
          display: flex;
          align-items: center;
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        }

        .body {
          grid-column: 1 / 3;
          grid-row: 2 / 3;
        }

        .name {
          font-size: 1.25rem;
          margin: 0;
        }
      `}</style>
    </div>
  )
}

export default Book
