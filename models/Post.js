const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

  createdBy: {
    type: String,
    ref: "User",
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  caption: {
    type: String,
    required: true,
  },
  taskDone: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.String,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Post", PostSchema);
