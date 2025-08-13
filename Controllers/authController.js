const jwt = require('jsonwebtoken') //very important here
const User = require('../Models/User')


//Regiistering a new user as a customer
const register = async (req, res) =>{
    try{
        const { name, email, password, role } = req.body

        //Chexck if email already exist
        let user = await User.findOne({email})
        if (user) {
            return res.status(400).json({
                success:false,
                message:'User already exist'
            })
        }
      
        //Saves new user in DB
        user = await User({name, email, password, role }).save()

        res.status(201).json({
            success: true,
            message: user
        })
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//login functionality
const login = async (req, res) =>{
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email})
            if(!user) {
                return res.status(400).json({
                    success: false,
                    message: "User not found"
                })
            }

            if(user.password !== password) {
                return res.status(400).json({
                    success: false,
                    message: "Password is wrong"
                })
            }
        
            
            const token = jwt.sign({id: user._id, role: user.role}, "anewsecret", {expiresIn: '5h'})

            return res.status(200).json({
                token
            })
    }
    catch (error) {
          res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Protected route example
const prof = async (req, res) => {
    try{
        const id = req.user.id
        return res.status(200).json({
            success: true,
            user: await User.findById(id).select('-password -role') // +name
        })
    } 
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// //to register an admin
// const registerAdmin = async (req, res) => {
//     try {
//          const { name, email, password, role } = req.body

//          //Check if Admin already existed
//          let admin = await Amin.findOne({email})
//           if (adminn) {
//                 return res.status(400).json({
//                     success: false,
//                     message: ''
//                 })
//             }

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

module.exports = { register, login, prof }