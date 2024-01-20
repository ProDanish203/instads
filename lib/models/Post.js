import { Schema, model, models } from "mongoose";

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
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [
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

const Post = models.Post || model('Post', PostSchema);

export default Post;