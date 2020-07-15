const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const commentService = require('../services/comment.service')

const addComment = catchAsync(async (req, res) => {
    const comment = await commentService.createComment(req.body, req.user, req.params.requestId)
    return res.status(httpStatus.CREATED).send(comment)
})

const getComments = catchAsync(async (req, res) => {
    const comments = await commentService.queryComments(req.params.requestId)
    res.status(httpStatus.OK).send(comments)
})

const getComment = catchAsync(async (req, res) => {
    const comment = await commentService.getComment(req.params.commentId, req.params.requestId)
    res.status(httpStatus.OK).send(comment)
})


module.exports = {
    addComment,
    getComments,
    getComment
}