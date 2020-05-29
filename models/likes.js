import mongoose from 'mongoose'
import { v4 } from 'uuid'

const schema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  postId: {
    type: String,
    required: [true, 'Please provide a post id'],
  },
  userId: {
    type: String,
    ref: 'User',
  },
})

const model = mongoose.models.Like || mongoose.model('Like', schema)

export default model
