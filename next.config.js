const withTM = require('next-transpile-modules')(['react-children-utilities'])
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const nextSettings = {
  target: 'serverless',
  exportPathMap: async () => {
    return {
      '/': { page: '/' },
      '/blog': { page: '/blog' },
      '/book': { page: '/book' },
    }
  },
  exportTrailingSlash: true,
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

    if (process.env.MEASURE === 'true') {
      config.plugins.push(
        new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
          analyzerMode: 'static',
        })
      )

      return new SpeedMeasurePlugin().wrap(config)
    }

    return config
  },
}

module.exports = withTM(nextSettings)
