import nextConnect from 'next-connect'
import middleware from '../../middlewares'
import extractUser from '../../lib/api/extractUser'
import User from 'models/users'
import Like from 'models/likes'
import Comment from 'models/comments'
const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
	if (!req.user) {
		res.status(401).end()
		return
	}
	
	const user = await User.findById(req.user._id)
		.populate('likes')
		.populate('comments')


  res.json({ user })
})

export default handler
