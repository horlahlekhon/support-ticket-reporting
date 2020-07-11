const express = require('express')
const validate = require('../middlewares/validate.middleware')
const authValidation = require('../validations/auth.validations')
const authController = require('../controllers/auth.controller')


const router = express.Router()

router.post('/register', validate(authValidation.register), authController.register)

module.exports = router
