const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,        
        default: "",
    },
    user_pwd: {
        type: String,        
        default: "",
    },
    user_nick: {
        type: String,        
        default: "",
    }
});

module.exports = mongoose.model('Users', userSchema);