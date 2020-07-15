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

const exportRequests = {
    query: Joi.object().keys({
        startDate: Joi.date(),
        endDate: Joi.date(),
        sortBy: Joi.string().valid('asc', 'desc'),
        limit: Joi.number()
    })
}

module.exports = {
    createSupportRequest,
    getSupportRequest,
    updateSupportRequest,
    exportRequests
}