// const jwt = require('jsonwebtoken') //very important here
const { model } = require('mongoose')
const Menu = require('../Models/Menu')


const getMenu = async (req, res) => {
    try {
        //fetching all menu item from DB
        const menu = await Menu.find()

        res.status(200).json({
            success: true,
            message: menu
        })
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const addDish = async (req, res) => {
    try {
        const { name, price, description} = req.body

        const dish = await Menu({name, price, description}).save()

        res.status(201).json({
            success: true,
            message: dish

        })
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// write a route to edit a dish
const editDish = async (req, res) => {
try {
    const dish = await Menu.findByIdAndUpdate(req.params.id, req.body, {new : true})

    res.status(200).json({
        success: true,
        message: dish 
    })
}
catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    })
   }
}


//write a route to delete a dish
const deleteDish = async (req, res) => {
try {
    const dish = await Menu.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            success: true,
            message: dish
        })
    
}
catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    })
   }
}


module.exports = { getMenu, addDish, editDish, deleteDish}