const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({

    image: {
        type: String,
        require: true,
        default: '/imgs/profile-pic'
    },
    cloudinaryId: {
        type: String,


    },
    user: {
        type: mongoose.Schema.Types.String,
        ref: "User",
    },

});

module.exports = mongoose.model("Profile", ProfileSchema);
