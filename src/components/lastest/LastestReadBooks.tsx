import React, { useContext } from 'react'
import { StateContext, StateType } from '../../modules/module'

const LastestReadBooks = ({
  ...restProps
}: LastestReadBooksProps): JSX.Element => {
  const state: StateType = useContext(StateContext)

  return (
    <div {...restProps}>
      {state.bookList?.items.map((book) => {
        return <div key={book.fields.name}>{book.fields.name}</div>
      })}
    </div>
  )
}

type LastestReadBooksProps = {} & JSX.IntrinsicElements['div']

export default LastestReadBooks
