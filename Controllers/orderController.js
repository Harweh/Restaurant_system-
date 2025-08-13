const Order = require('../Models/Order')

//Creating order
const createOder = async (req, res) => {
    try {
        const { items, totalAmount} = req.body 

        const order = await Order.create({
            customer: req.user.id,
            items,
            totalAmount
        })

        res.status(201).json({
            success: true,
            message: order
        })
    } 
    catch (error) {
        return res.status(500).json({
            sucess: false,
            message: error.message
        })
    }

}

//Get my orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({customer: req.user.id}).populate("items.menuItem")

        return res.status(200).json({
            success: true,
            message: orders
        })
    }
    catch (error) {
        return res.status(500).json({
            success:  false,
            messsge: error.message
        }) 
    }
}

//tracking order
const trackOders = async (req, res) => {
   try {
    const order = await Order.findById(req.params.id) 
    res.json({status: order.status})
    } 
    catch (error) {
        return res.status(500).json({
            success:  false,
            messsge: error.message
        }) 
    }
}

//adminGetOrder
const adminGetOrder = async (req, res) => {
    try {
        const orders = await Order.find().populate("customer items.menuItem")
        res.status(200).json({
            orders
        })
    } 
    catch (error) {
         return res.status(500).json({
            success:  false,
            messsge: error.message
        }) 
    }
}

//updating status
const updateOrderStatus = async (req, res) => {
    try {
        const { status, comment } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {status, comment},
            {new: true}
        )
        res.status(200).json({order})
    }
     catch (error) {
        return res.status(500).json({
            success:  false,
            messsge: error.message
        }) 
    }
}

module.exports = { createOder, getMyOrders, trackOders, adminGetOrder, updateOrderStatus }