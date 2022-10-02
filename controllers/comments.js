
const Comment = require("../models/Comment")
const User = require("../models/User")

module.exports = {

    createComments: async (req, res) => {
        const postUser = await User.findById(req.user.id)
        try {

            await Comment.create({
                comment: req.body.comment,
                likes: 0,
                user: req.user.id,
                post: req.params.id,
                createdBy: postUser.userName,
            });
            console.log("Comment has been added!");
            res.redirect("/post/" + req.params.id);
        } catch (err) {
            console.log(err);
        }
    },

    deletePost: async (req, res) => {
        try {
            // Find post by id
            let post = await Post.findById({ _id: req.params.id });
            // Delete image from cloudinary
            await cloudinary.uploader.destroy(post.cloudinaryId);
            // Delete post from db
            await Post.remove({ _id: req.params.id });
            console.log("Deleted Post");
            res.redirect("/profile");
        } catch (err) {
            res.redirect("/profile");
        }
    },
};
