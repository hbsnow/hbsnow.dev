const withCSS = require('@zeit/next-css')

const nextSettings = {
  target: 'serverless',
  pageExtensions: ['tsx', 'md'],
}

module.exports = withCSS(nextSettings)
