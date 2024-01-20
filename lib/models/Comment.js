import { Schema, model, models } from "mongoose";
import User from "./User";
import Post from "./Post";

const CommentSchema = new Schema({
    text: {
        type: String,
        required: [true, "Text is required"],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required"],
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "Parent is required"],
    },   
    likes: {
        type: Number,
        default: 0
    }
},
{timestamps: true}
)

// Cascading
const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;