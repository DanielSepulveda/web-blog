import nextConnect from 'next-connect'
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

  const isPostLiked = await Like.exists(values)

  res.status(200).json({ isPostLiked })
})

export default handler
