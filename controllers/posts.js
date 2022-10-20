const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment")
const User = require("../models/User")
const Profile = require("../models/Profile");
const Summary = require("../models/Summary");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const posts = await Post.find({ user: req.user.id });
      const profile = await Profile.find({ post: req.params.id }).sort({ createdAt: "desc" }).lean();
      const summary = await Summary.find({ post: req.params.id }).sort({ createdAt: "desc" }).lean();
      res.render("profile.ejs", { posts: posts, user: req.user, profile: profile, summary: summary, post: post });
      console.log(profile)
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: "desc" }).lean();
      const summary = await Summary.find({ post: req.params.id }).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments, summary: summary, });

    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      let postUser = await User.findById(req.user.id);
      const profile = await Profile.find({ post: req.params.id }).sort({ createdAt: "desc" }).lean();
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts, user: req.user, createdBy: postUser.userName, profile: profile, userId: posts.user });
      console.log(profile)
    } catch (err) {
      console.log(err);
    }
  },

  createPost: async (req, res) => {
    try {
      const postUser = await User.findById(req.user.id)
      await Post.create({
        createdBy: postUser.userName,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
        taskDone: false,
        private: false
      });
      console.log("Post has been added!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },
  createProfilePic: async (req, res) => {
    try {
      //Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      //const postUser = await User.findById(req.user.id)
      await Profile.create({

        image: result.secure_url,
        cloudinaryId: result.public_id,

        user: req.user.id,

      });
      console.log("Profile pic has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },

  taskDone: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          taskDone: true,
        }
      );
      console.log("Task done");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {

      let post = await Post.findById({ _id: req.params.id });


      await Post.remove({ _id: req.params.id });

      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },

};
