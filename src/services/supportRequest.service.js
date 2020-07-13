const SupportRequest =  require('../models/schema/supportRequest.model')
const ApiError = require('../utils/ApiError')
const httpStatus = require('http-status')


/**
 * Create a SupportRequest
 * @param {Object} supportRequestBody
 * @returns {Promise<User>}
 */
const createSupportRequest = async (data, user) => {
    const title = data.title
    const exists = await SupportRequest.findOne({title: title, userId: user._id})
    if (exists){
        throw new  ApiError(httpStatus.BAD_REQUEST,'Support request already exists')
    }
    data.userId = user.id
    return  SupportRequest.create(data)
}

const getSupportRequestById = (id) => {
    return SupportRequest.findById(id)
}

const getSupportRequestByTitle = (title) => {
    return SupportRequest.findOne({title: title})
}


module.exports = {
    createSupportRequest,
    getSupportRequestById,
    getSupportRequestByTitle
}