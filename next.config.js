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
      MONGODB_URI: 'mongodb+srv://blog-user:123123123@cluster0-jmuao.mongodb.net/blog?retryWrites=true&w=majority',
      DB_NAME: 'blog',
      WEB_URI: 'https://web-blog-git-auth.danielgsepulvedaa.now.sh/',
    },
  }
)
