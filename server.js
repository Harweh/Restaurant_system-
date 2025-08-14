const express = require("express")
const jwt = require('jsonwebtoken')
const authRoutes = require('./Routes/authRoute')
const menuRoutes = require('./Routes/menuRoutes')
const orderRoutes = require('./Routes/orderRoute')
require("dotenv").config()
const cors = require('cors')
const connectDB = require("./config/db")

connectDB()

const app = express()

//middlleware, to recieve json data properly, middleware is return before all the routes..
app.use(express.json())  //to accept all json request as a body, post put get or delete anything.....is very important 

app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'On root page'
    })
})

app.use('/api/v1/auth', authRoutes)

app.use('/api/v1/menu', menuRoutes)

app.use('/api/v1/order', orderRoutes)

// app.get('/token', async (req, res) =>{
//     let data = {
//         "email" : "cool.com",
//         "age" : 100
//     }
//     //Creating a jwt signature
//     const token = jwt.sign(data, "mysecret", {expiresIn: '2m'})

//     res.status(200).json({token})
// })

// app.get('/token/:jwToken', async (req, res) => {
//     try {
//         const {jwToken} = req.params

//         const decoded = jwt.verify(jwToken, 'mysecret')
//         res.status(200).json({
//             decoded
//         })
//     } 
//     catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message
//         })
//     }
// })

app.listen(process.env.PORT, () => console.log(`Server started at http://localhost:${process.env.PORT}`))