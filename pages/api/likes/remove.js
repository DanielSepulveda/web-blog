import nextConnect from 'next-connect'
import User from 'models/users'
import Like from 'models/likes'
import middleware from '../../../middlewares'

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req, res) => {
  if (!req.user) {
    res.status(401).end()
    return
  }

  const values = req.body
  values.userId = req.user.id

  const like = Like.findOne(values)

  await like.remove((_, removedLike) => {
    User.updateOne({ id: values.userId }, { $pull: { likes: removedLike.id } })
  })

  res.status(204).end()
})

export default handler
