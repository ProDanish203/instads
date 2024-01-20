import { Schema, model, models } from "mongoose";
import Post from "./Post";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already in use"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already in use"]
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    image: String,
    gender: String,
    bio: String,
    website: String,
    emailVerified:{
        type: Boolean,
        default: false
    },
    onboarded:{
        type: Boolean,
        default: false
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ], 
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],  
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],   
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],   
},
{timestamps: true}
)

UserSchema.pre('remove', async function(next) {
    try {
      await Post.deleteMany({ author: this._id });
      next();
    } catch (error) {
      next(error);
    }
  });

const User = models.User || model('User', UserSchema);

export default User;