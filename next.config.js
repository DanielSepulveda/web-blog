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
      MONGO_DB_URL:
        'mongodb+srv://admin:123456adminBlog@blogging-lea0y.mongodb.net/bloggingdb?retryWrites=true&w=majority',
        DATOCMS_API_TOKEN: '328da546216e601506821c482008e4'
    },
  }
)
