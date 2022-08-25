const mongoose = require('mongoose')
const {ObjectId} = require('mongodb')

const userSchema = new mongoose.Schema({

    userAccId : {
        type : ObjectId,
        required : true
    },
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
    phoneNumber: {
       type: Number,
       required:true
    }
})

module.exports = mongoose.model('User', userSchema)