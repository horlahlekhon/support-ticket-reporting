const SupportRequest =  require('../models/schema/supportRequest.model')
const ApiError = require('../utils/ApiError')
const httpStatus = require('http-status')
const { requestStatus } = require('../models/config')
const toCsv = require('mongoose-to-csv')
const fs = require('fs')
const path = require('path')

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
    data.requestStatus = requestStatus.pending
    return  SupportRequest.create(data)
}

const getSupportRequestById = async (id) => {
    return await SupportRequest.findById(id)
}

const getSupportRequestByTitle = async (title) => {
    return SupportRequest.findOne({title: title});
}

const querySupportRequests  = async () => {
    return await SupportRequest.find()
}

const updateSupportRequestById = async (requestId, req) => {
    const request = await SupportRequest.findById(requestId)
    if (!request){
        throw new ApiError(httpStatus.NOT_FOUND, "Support request not found")
    }
    if (request.userId.toString() !== req.user._id.toString()){
        throw new ApiError(httpStatus.FORBIDDEN, "Sorry, you can only modify a support request you created")
    }
    if (request.dateClosed && request.requestStatus === requestStatus.closed){
        throw new ApiError(httpStatus.BAD_REQUEST, "Sorry, the support request has been closed and cannot be modified, kindly create a new support ticket")
    }
    Object.assign(request, req.body)
    request.save()
    return request
}

const exportSupportRequest = async (options, filter) => {
    // const sort = options.sortBy === 'desc' ? -1 : 1
    const d = path.join(__dirname, '../temp/supportRequests.csv' )
     await SupportRequest.findAndStreamCsv()
        .pipe(fs.createWriteStream(d))
    return d
}
module.exports = {
    createSupportRequest,
    getSupportRequestById,
    getSupportRequestByTitle,
    querySupportRequests,
    updateSupportRequestById,
    exportSupportRequest
}