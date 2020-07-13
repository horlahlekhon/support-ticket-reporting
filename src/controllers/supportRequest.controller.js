const supportRequestService = require('../services/supportRequest.service')
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');


const createRequest  = catchAsync( async (req, res) => {
    const supportReq = await  supportRequestService.createSupportRequest(req.body, req.user)
    return res.status(httpStatus.CREATED).send(supportReq)
})

module.exports = {
    createRequest
}