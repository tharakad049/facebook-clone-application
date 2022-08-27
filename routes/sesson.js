const express = require('express');
const app = express();
const router = express.Router()
const jwt=require('jsonwebtoken')
require('dotenv').config()

const User = require('../models/user.models')
app.use(express.json());

router.post('/createAccount', async (req, res) => {
    try {
        const re = await User.findOne({email: req.body.email});
        if (re == null) {
            const user = new User({
                firstName: req.body.firstName,
                surName: req.body.surName,
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                password: req.body.password
            })
            const response = await user.save();
            response != null ? await res.json({code: '200', message: 'Account create successful', data: null}) :
                await res.json({code: '500', message: 'User Account Create Fail', data: null});
        } else {
            await res.json({code: '500', message: 'Email is Already Exists', data: null});
        }
    } catch (err) {
        res.send('Err : ' + err)
    }
})


router.post('/login',async(req,res)=>{
    const response= await User.findOne({email : req.body.email , password : req.body.password});
   if(response!=null){
        const accessToken=jwt.sign({surName : response.surName},process.env.TOKEN_KEY,{expiresIn : '10s'})
        res.send({accessToken})
    }
})

module.exports = router
