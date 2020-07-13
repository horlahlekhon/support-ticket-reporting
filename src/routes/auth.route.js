const express = require('express')
const validate = require('../middlewares/validate.middleware')
const authValidation = require('../validations/auth.validations')
const authController = require('../controllers').authController


const router = express.Router()

router.post('/register', validate(authValidation.register), authController.register)
router.post('/login', validate(authValidation.login), authController.login)

module.exports = router
