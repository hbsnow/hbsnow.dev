import React, { FC } from "react";

import { Entry } from "contentful";

import Rating from "../../elements/rating/Rating";
import { IBookFields } from "../../models/contentful";

type Props = {
  book: Entry<IBookFields>["fields"];
};

const Book: FC<Props> = ({ book }) => {
  return (
    <div className="book">
      <header className="header">
        <h3 className="name">{book.name}</h3>
      </header>

      <div className="rate">
        <Rating rate={book.isRead ? book.rate : 0} />
      </div>

      <div className="body">{book.body}</div>
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
  );
};

export default Book;
