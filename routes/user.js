const express = require('express');
const app = express();
const router = express.Router()

const User = require('../models/user.models')
app.use(express.json());

router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
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

module.exports = router