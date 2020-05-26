import mongoMiddleware from '../../../middleware/mongo-middleware'
import apiHandler from '../../../middleware/api-handler'

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: { id },
    method,
  } = req

  apiHandler(res, method, {
    GET: (response) => {
      models.User.find({ id }, (error, user) => {
        if (error) {
          connection.close()
          response.status(500).json({ error })
        } else {
          response.status(200).json(user)
          connection.close()
        }
      })
    },
    // POST: (response) => {
    //   models.User.findOneAndUpdate(id, { name }, {}).exec((error, user) => {
    //     if (error) {
    //       connection.close()
    //       response.status(500).json({ error })
    //     } else {
    //       response.status(200).json(user)
    //       connection.close()
    //     }
    //   })
    // },
  })
})
