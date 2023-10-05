import mongoose from 'mongoose';
const {Schema,model} = mongoose;

const PostSchema = new Schema({
  title:String,
  des:String,
  content:String,
  img:String,
  cat:String,
  author:{type:Schema.Types.ObjectId, ref:'User'},
}, {
  timestamps: true,
});

const PostModel = model('Post', PostSchema);

export default PostModel;