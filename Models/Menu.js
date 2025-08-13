const { default: mongoose } = require('mongoose');
const mongoos= require('mongoose');

const menuSchema = new mongoos.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    available:{
        type: Boolean,
        default: true
    }
})


module.exports = mongoose.model('Menu', menuSchema)