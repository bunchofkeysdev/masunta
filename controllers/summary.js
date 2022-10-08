const Summary = require("../models/Summary")
const User = require("../models/User")
const Post = require("../models/Post")

module.exports = {

    createSummary: async (req, res) => {
        try {

            await Summary.create({
                summary: req.body.summary,
                post: req.params.id,
            });
            await Post.findOneAndUpdate(
                { _id: req.params.id },
                {
                    taskDone: true,
                }
            );
            console.log("Summary has been added!");
            res.redirect("/profile");
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
