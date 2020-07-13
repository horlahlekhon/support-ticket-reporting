const express = require('express')
const authRoutes = require('./auth.route')
const userRoutes = require('./user.route')
const supportRequestRoutes = require('./supportRequest.route')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/support-requests', supportRequestRoutes)

module.exports = router