
const Comment = require("../models/Comment")
const User = require("../models/User")

module.exports = {

    createComments: async (req, res) => {
        const commentUser = await User.findById(req.user.id)
        try {

            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                user: req.user.id,
                post: req.params.id,
                createdBy: commentUser.userName,
                createdById: req.user.id
            });
            console.log("Comment has been added!");
            res.redirect("/post/" + req.params.id);
        } catch (err) {
            console.log(err);
        }
    },

    deleteComment: async (req, res) => {
        try {
            await Comment.deleteOne({ _id: req.params.commentid })
            console.log("comment removed")
            res.redirect("/post/" + req.params.postid);
        } catch (err) {
            console.log(err);
        }
    }
};
