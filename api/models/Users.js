import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const UserSchema = new Schema({
  username: {
    type: String
  },
  password: {type: String
  },
  img:{type:String}
});

const UserModel = model('User', UserSchema);

export default UserModel;