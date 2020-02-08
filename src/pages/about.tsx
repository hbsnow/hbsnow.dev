import React from 'react'
import { NextPage } from 'next'
import DefaultTemplate from '../templates/DefaultTemplate/DefaultTemplate'

const subTitle = {
  name: 'About',
  href: '/about',
}

const Page: NextPage = () => {
  return <DefaultTemplate subTitle={subTitle}>about</DefaultTemplate>
}

export default Page
