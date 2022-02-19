const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user_id: {
        type: String,        
        default: "",
    },
    home_id: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('Likes', likeSchema);