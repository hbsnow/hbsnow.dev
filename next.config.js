const withTM = require('next-transpile-modules')(['react-children-utilities'])

// if (process.env.NODE_ENV !== 'production') {
require('dotenv').config()
// }

const nextSettings = {
  target: 'serverless',
  exportPathMap: async () => {
    return {
      '/': { page: '/' },
      '/blog': { page: '/blog' },
      '/book': { page: '/book' },
    }
  },
  pageExtensions: ['tsx'],
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_API_ACCESS_TOKEN: process.env.CONTENTFUL_API_ACCESS_TOKEN,
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      }
    }

    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
}

module.exports = withTM(nextSettings)
