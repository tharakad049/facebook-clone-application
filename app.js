const express=require('express');
const mongoose=require('mongoose')
const app=express()
const port=4000;

const user = require('./routes/user')
const url='mongodb://localhost/facebook-clone-application'

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}
mongoose.connect(url, options, {useNewUrlParser: true})

const con=mongoose.connection
con.on("open",()=>{
    console.log('MongoDB connected !')
})

app.use(express.json())
app.use('/user', user)

app.listen(port,()=>{
    console.log(`server is started in port ${port}`)
})

