//how to write a middleware
const adminOnly = (req, res, next) => {
    if(req.user.role !== 'ADMIN') {
        return res.status(400).json({
            success: false,
            message:'Admin access only'
        })
    }

    next()
}

module.exports = {adminOnly}