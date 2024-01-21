import { Schema, model, models } from "mongoose";
import User from "./User";

const PostSchema = new Schema({
    image: {
        type: String,
        required: [true, "Image is required"],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required"],
    },
    caption: String,
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    location: String,   
},
{timestamps: true}
)

// Cascading
PostSchema.pre('remove', async function(next) {
    try {
        const postId = this._id;
  
        await User.updateMany(
            { posts: postId },
            { $pull: { posts: postId } }
        );
    
        await User.updateMany(
            { likes: postId },
            { $pull: { likes: postId } }
        );
    
        await User.updateMany(
            { bookmarks: postId },
            { $pull: { bookmarks: postId } }
        );
    
        next();
    } catch (error) {
        next(error);
    }
});
  
const Post = models.Post || model('Post', PostSchema);

export default Post;