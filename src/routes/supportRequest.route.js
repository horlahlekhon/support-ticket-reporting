const express = require('express')
const validate = require('../middlewares/validate.middleware')
const supportTicketValidation = require('../validations/supportTicket.validations')
const supportRequestController = require('../controllers/supportRequest.controller')
const auth =  require('../middlewares/auth.middleware')

const router = express.Router()

router
    .route('/')
    .post(auth('manageSupportTickets'), validate(supportTicketValidation.createSupportRequest), supportRequestController.createRequest )

module.exports = router