import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  commentId: {
    type: String,
    required: [true, 'Please provide'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const model = mongoose.models.Comment || mongoose.model('Comment', schema)

export default model
