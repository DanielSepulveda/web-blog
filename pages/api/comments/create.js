import nextConnect from 'next-connect'
import User from 'models/users'
import Comment from 'models/comments'
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

  const comment = new Comment(values)
  await comment.save()

  const user = await User.findById(req.user.id)
  user.comments.push(comment)
  await user.save()

  res.status(201).end()
})

export default handler
