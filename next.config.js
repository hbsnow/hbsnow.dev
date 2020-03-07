const fs = require('fs')
const path = require('path')
const withCSS = require('@zeit/next-css')

// if (process.env.NODE_ENV !== 'production') {
require('dotenv').config()
// }

const nextSettings = {
  target: 'serverless',
  exportPathMap: async () => {
    const fileList = fs.promises.readdir('./src/posts', (_, items) => items)

    const postPathMap = {}
    ;(await fileList).forEach((file) => {
      const slug = path.basename(file, '.md')
      postPathMap[`/blog/${slug}`] = { page: '/blog/[slug]' }
    })

    return {
      '/': { page: '/' },
      '/blog': { page: '/blog' },
      '/book': { page: '/book' },
      ...postPathMap,
    }
  },
  pageExtensions: ['tsx'],
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_API_ACCESS_TOKEN: process.env.CONTENTFUL_API_ACCESS_TOKEN,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
}

module.exports = withCSS(nextSettings)
