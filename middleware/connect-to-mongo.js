import mongoose from 'mongoose'
import UserSchema from '../pages/api/models/usersModel'
import PostSchema from '../pages/api/models/postsModel'

const connectToMongo = async () => {
  const connection = await mongoose.createConnection(
    'mongodb+srv://blog-user:123123123@cluster0-jmuao.mongodb.net/blog?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useUnifiedTopology: true,
    }
  )
  const User = connection.model('users', UserSchema)
  const Post = connection.model('posts', PostSchema)
  return {
    connection,
    models: {
      User,
      Post,
    },
  }
}

export default connectToMongo
