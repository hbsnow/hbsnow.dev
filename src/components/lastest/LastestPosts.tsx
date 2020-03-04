import React, { useContext } from 'react'
import { StateContext, StateType } from '../../modules/module'

const LastestPosts = ({ ...restProps }: LastestPostsProps): JSX.Element => {
  const state: StateType = useContext(StateContext)

  return (
    <div {...restProps}>
      {state.blogList?.map((post) => {
        return <div key={post.slug}>{post.slug}</div>
      })}
    </div>
  )
}

type LastestPostsProps = {} & JSX.IntrinsicElements['div']

export default LastestPosts
