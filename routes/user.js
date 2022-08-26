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

router.get('/:password', async (req, res) => {
    try {
        const user = await User.findById(req.params.password)
        await res.json(user)
    } catch (err) {
        res.send('Err :' + err)
    }
})

router.put('/updateProfile/:email', (req, res) => {
    try {
        const user = User.findById(req.params.email)
        user.firstName = req.body.firstName
        user.surName = req.body.surName
        user.gender = req.body.gender
        user.dateOfBirth = req.body.dateOfBirth
        user.password = req.body.password
        user.phoneNumber = req.body.phoneNumber
        user.email = req.body.email

        const response = user.save()
        res.json(response)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const response = await user.remove()

        await res.json(response)
    } catch (err) {
        res.send('Err: ' + err)
    }
})

module.exports = router