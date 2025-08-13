const express = require('express')
const {
    createOder,
    getMyOrders,
    trackOders,
    adminGetOrder,
    updateOrderStatus
} = require('../Controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')
const {adminOnly} = require('../middleware/roleMiddleware')



const router = express.Router()

//Customer
router.post('/', authMiddleware, createOder)

router.get('/', authMiddleware, getMyOrders)

router.get(':id/track', authMiddleware, trackOders)


//Admin
router.get('/admin/all', authMiddleware, adminOnly, adminGetOrder)

router.put('/admin/:id', authMiddleware, adminOnly, updateOrderStatus)


module.exports = router
