const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
        ref: "User",
    },
});

module.exports = mongoose.model("Comment", CommentSchema);
