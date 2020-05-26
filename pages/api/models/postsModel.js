import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

module.exports = PostSchema
