const ApiError = require('../utils/ApiError')
const httpStatus = require('http-status')
const Comment  = require('../models/schema/comment.model')
const SupportRequest = require('../models/schema/supportRequest.model')
const roles = require('../models/config').roles
const requestStatus = require('../models/config').requestStatus
const User = require('../models/schema/user.model')

const createComment = async (body, user, supportRequest) => {
    const request = await SupportRequest.findById(supportRequest)
    const requestComments = await Comment.find({supportRequest})
    if (!request){
        throw new ApiError(httpStatus.BAD_REQUEST, "The support request does not exist")
    }
    //make sure the customer doesnt comment before either the support-agent or an admin
    if(requestComments.length === 0 && user.role === roles[0]){
        throw new ApiError(httpStatus.BAD_REQUEST, "Please allow the support agent to comment before commenting.")
    }
    body.supportRequest = supportRequest
    if(user.role !== roles[0] ){
        body.fromCustomer = false
    }else{
        if(request.userId.toString() !== user._id.toString()){
            throw new ApiError(httpStatus.BAD_REQUEST,"Sorry, you can only comment on a support request that you created.")
        }
        body.fromCustomer = true
    }
    if (request.dateClosed && request.requestStatus === requestStatus.closed){
        throw new ApiError(httpStatus.BAD_REQUEST, "This Support request is closed, new comments are not allowed.")
    }
    body.commenter = user._id
    return Comment.create(body)
}

const queryComments = async (requestId) => {
    return await Comment.find({supportRequest: requestId}).sort({'createdAt': 'descending'})
}

const getComment = async (commentId, requestId) => {
    const comment = await Comment.findOne({supportRequest: requestId, _id: commentId})
    comment.commenter = await User.findOne({_id: comment.commenter})
    return comment
}

module.exports = {
    createComment,
    getComment,
    queryComments
}