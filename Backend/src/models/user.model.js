const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        unique: true
    },
    language: {
        type: String,
        enum: ["english", "hindi"],
        default: "english",
    },
    timeStamp: {
        type: Date,
        time: Date.now,
    }
})

const userModel = mongoose.model('user', userSchema);


module.exports = userModel;