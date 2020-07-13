const Joi = require('@hapi/joi')
const { requestStatus }  = require('../models/config')


const createSupportRequest = {
    body: {
        title: Joi.string().required(),
        description: Joi.string().required()
    }
}

const getSupportRequest = {
    params: Joi.object().keys({
        requestId: Joi.string().required(),
    }),
}

const updateSupportRequest = {
    params: Joi.object().keys({
        requestId: Joi.string().required()
    }),
    body: Joi.object().keys({
        title: Joi.string(),
        description: Joi.string(),
        requestStatus: Joi.string().valid(...Object.values(requestStatus))
    })

}

module.exports = {
    createSupportRequest,
    getSupportRequest,
    updateSupportRequest
}