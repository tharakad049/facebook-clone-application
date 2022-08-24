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

router.get('/', async (req, res) =>{
    try {
        const user =  await User.find()
        await res.json(user)
    }catch (err) {
        res.send('Err : ' + err)
    }
})

router.get('/:surName' , async (req, res) =>{
    try {
        const user = await User.findById(req.params.surName)
        await res.json(user)
    }catch (err) {
        res.send('Err :' + err)
    }
})

router.put('/:surName', (req, res) =>{
    try {
        const user = User.findById(req.params.surName)
        user.firstName=req.body.firstName
        user.surName=req.body.surName
        user.gender=req.body.gender
        user.dateOfBirth=req.body.dateOfBirth
        user.password=req.body.password
        user.phoneNumber=req.body.phoneNumber
        user.email=req.body.email

        const response = user.save()
        res.json(response)
    }catch (err) {
        res.send('Err: ' + err )
    }
})
module.exports=router