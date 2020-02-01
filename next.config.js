const withCSS = require('@zeit/next-css')
const rehypePrism = require('@mapbox/rehype-prism')
const withMDX = require('@next/mdx')({
  options: {
    rehypePlugins: [rehypePrism],
  },
})
const nextSettings = {
  target: 'serverless',
  pageExtensions: ['tsx', 'mdx'],
}

module.exports = withMDX(withCSS(nextSettings))
