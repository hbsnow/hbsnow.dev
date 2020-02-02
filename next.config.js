const withCSS = require('@zeit/next-css')

const nextSettings = {
  target: 'serverless',
  pageExtensions: ['tsx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
}

module.exports = withCSS(nextSettings)
