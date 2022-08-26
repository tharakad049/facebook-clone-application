const express = require('express');
const app = express();
const router = express.Router()

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
            response != null ? res.json({code: '200', message: 'Account create successful', data: null}) :
            res.json({code: '500', message: 'User Account Create Fail', data: null});
        } else {
            res.json({code: '500', message: 'Email is Already Exists', data: null});
        }
    } catch (err) {
        res.send('Err : ' + err)
    }
})

router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        await res.json(user)
    } catch (err) {
        res.send('Err : ' + err)
    }
})

router.get('/:email', async (req, res) => {
    try {
        const user = await User.findById(req.params.email)
        await res.json(user)
    } catch (err) {
        res.send('Err :' + err)
    }
})

router.put('/updateProfile/:email' ,async(req,res)=>{
    const response = await User.findOneAndUpdate({email : req.params.email} , req.body)
    response!=null ? res.json({code:'200',message:'profile update success full',data:null}) :
        res.json({code:'500',message:'profile update fail',data:null})
})

router.delete('/deleteProfile/:email', async (req, res) => {
    try {
        const user = await User.findOne(req.params.email)
        const response = await user.remove()
        await res.json(response)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

router.post('/login',async(req,res)=>{
    const response= await User.findOne({email : req.body.email , password : req.body.password});
    response!=null ? res.json({code:'200',message:'login  success full',data:response.surName}) :
        res.json({code:'500',message:'login fail',data:null})

})

module.exports = router