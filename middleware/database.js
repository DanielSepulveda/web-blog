import { MongoClient } from 'mongodb'
import nextConnect from 'next-connect'

const client = new MongoClient(
  'mongodb+srv://blog-user:123123123@cluster0-jmuao.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect()
  req.dbClient = client
  req.db = client.db('posts')
  return next()
}

const middleware = nextConnect()

middleware.use(database)

export default middleware
