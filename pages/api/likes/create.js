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

  const like = new Like(values)
  await like.save()

  const user = await User.findById(req.user.id)
  user.likes.push(like)
  await user.save()

  res.status(201).end()
})

export default handler
