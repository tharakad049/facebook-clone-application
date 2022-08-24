const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    surName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    phoneNumber: {
       type: Number,
       req:true
    },
    email: {
        type: String,
        req:true
    }
})

module.exports = mongoose.model('User', userSchema)