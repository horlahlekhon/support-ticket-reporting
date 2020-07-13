const Joi = require('@hapi/joi')


const createSupportRequest = {
    body: {
        title: Joi.string().required(),
        description: Joi.string().required()
    }
}

module.exports = {
    createSupportRequest
}