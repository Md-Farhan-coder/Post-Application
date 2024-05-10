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
  comments: [{
    type: String
  }],
  likes: [{
    type: String
  }]
});


export default mongoose.model('Post', postSchema);