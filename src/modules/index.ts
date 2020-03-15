import { BlogType } from './blog'
import { EntryCollection } from 'contentful'
import { IBookFields } from '../models/contentful'

export type StateType = {
  blogList?: BlogType[]
  bookList?: EntryCollection<IBookFields>
}
