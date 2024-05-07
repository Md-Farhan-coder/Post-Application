import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  like: {
    type: Number,
    default: 0
  },
  comments: [{
    type: String
  }]
});


export default mongoose.model('Post', postSchema);