import mongoMiddleware from '../../middleware/mongo-middleware'
import apiHandler from '../../middleware/api-handler'

export default mongoMiddleware(async (req, res, connection, models) => {
  const { method } = req

  apiHandler(res, method, {
    GET: (response) => {
      models.Post.find({}, (error, post) => {
        if (error) {
          connection.close()
          response.status(500).json({ error })
        } else {
          response.status(200).json(post)
          connection.close()
        }
      })
    },
  })
})
