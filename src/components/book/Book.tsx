import React from "react";

import { Entry } from "contentful";

import Rating from "../../elements/rating/Rating";
import { IBookFields } from "../../models/contentful";

type Props = Readonly<{
  book: Entry<IBookFields>["fields"];
}>;

const Book = (props: Props): JSX.Element => {
  const { book } = props;

  return (
    <div className="book">
      <header className="header">
        <h3 className="name">{book.name}</h3>
      </header>

      <div className="rate">
        <Rating rate={book.isRead ? book.rate : 0} />
      </div>

      <div className="body">{book.body}</div>
    </div>
  );
};

export default Book;
