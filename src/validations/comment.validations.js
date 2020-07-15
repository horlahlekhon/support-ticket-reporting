const Joi = require('@hapi/joi')

const createComment = {
    params: Joi.object().keys({
        requestId: Joi.string().required(),
    }),
    body: {
        comment: Joi.string().required()
    }
}

const getComment = {
    params: Joi.object().keys({
        requestId: Joi.string().required(),
        commentId: Joi.string().required()
    }),
}

const getComments = {
    params: Joi.object().keys({
        requestId: Joi.string().required(),
    })
}

module.exports = {
    createComment,
    getComment,
    getComments
}