/* eslint-disable no-underscore-dangle */
import crypto from 'crypto'
import nextConnect from 'next-connect'
import middleware from '../../../../middlewares/middleware'

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req, res) => {
  if (!req.user) {
    res.json(401).send('you need to be authenticated')
    return
  }
  const token = crypto.randomBytes(32).toString('hex')
  await req.db.collection('tokens').insertOne({
    token,
    userId: req.user._id,
    type: 'emailVerify',
    expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  })
  res.end('ok')
})

export default handler
