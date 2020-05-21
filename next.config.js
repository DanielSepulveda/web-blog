/* eslint-disable no-param-reassign */
require('dotenv').config()
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif', 'jpg'],
      },
    ],
  ],
  {
    env: {
      DATOCMS_API_TOKEN: process.env.DATOCMS_API_TOKEN,
    },
  }
)
