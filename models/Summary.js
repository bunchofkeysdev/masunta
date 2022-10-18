const mongoose = require("mongoose");

const SummarySchema = new mongoose.Schema({
    summary: {
        type: String,
        required: true,
    },

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    private: {
        type: Boolean,
        required: true,
        default: false,
    },

});

module.exports = mongoose.model("Summary", SummarySchema);
