const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    items: [
         {
            menuItem: {type: mongoose.Schema.ObjectId, ref: "Menu" },
            quantity: {type: Number, default: 1 }
        }
    ],
    status: {
        type: String,
        enum : ["Pending", "Accepted", "Rejected", "Transit", "Delivered"],
        default: "Pending"
    },
    comment: String,
    totalAmount: Number,
}, {timestamps: true})



module.exports = mongoose.model('Order', OrderSchema)