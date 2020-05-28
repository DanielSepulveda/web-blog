import mongoose from 'mongoose'
import { v4 } from 'uuid'

const schema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  commentId: {
    type: String,
    required: [true, 'Please provide a commentId'],
  },
  userId: {
    type: String,
    ref: 'User',
  },
})

const model = mongoose.models.Comment || mongoose.model('Comment', schema)

export default model
