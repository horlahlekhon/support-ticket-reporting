const express = require('express')
const validate = require('../middlewares/validate.middleware')
const supportTicketValidation = require('../validations/supportTicket.validations')
const supportRequestController = require('../controllers/supportRequest.controller')
const auth =  require('../middlewares/auth.middleware')

const router = express.Router()

router
    .route('/')
    .post(auth('createSupportRequest'), validate(supportTicketValidation.createSupportRequest), supportRequestController.createRequest )
    .get(auth('manageSupportTickets'), supportRequestController.getSupportRequests)

router
    .route('/:requestId')
    .get(auth( 'getRequest'), validate(supportTicketValidation.getSupportRequest), supportRequestController.getSupportRequest)
    .patch(auth('modifyRequest'), validate(supportTicketValidation.updateSupportRequest), supportRequestController.updateSupportRequest )

module.exports = router