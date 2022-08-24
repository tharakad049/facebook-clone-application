const express = require('express');
const app=express();
const router = express.Router()

const User = require('../models/user.models')
app.use(express.json());


router.post('/createAccount', async (req, res)=>{
    const user = new User({
        firstName:  req.body.firstName,
        surName: req.body.surName,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    })
    try {
        const response = await user.save();
        await res.json(response)
    }catch (err) {
        res.send('Err : ' + err)
    }
})

module.exports=router