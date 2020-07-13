const supportRequestService = require('../services/supportRequest.service')
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');


const createRequest  = catchAsync( async (req, res) => {
    const supportReq = await  supportRequestService.createSupportRequest(req.body, req.user)
    return res.status(httpStatus.CREATED).send(supportReq)
})

const getSupportRequests = catchAsync(async (req, res) => {
    const reqs = await supportRequestService.querySupportRequests()
    return res.status(httpStatus.OK).send(reqs)
})

const getSupportRequest = catchAsync(async (req, res) => {
    const request = await supportRequestService.getSupportRequestById(req.params.requestId)
    return res.status(httpStatus.OK).send(request)
})

const updateSupportRequest = catchAsync(async (req, res) => {
    const request = supportRequestService.updateSupportRequestById(req.params.requestId, req)
    return res.status(httpStatus.OK).send(request)
} )

module.exports = {
    createRequest,
    getSupportRequests,
    getSupportRequest,
    updateSupportRequest
}