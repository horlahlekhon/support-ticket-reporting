const supportRequestService = require('../services/supportRequest.service')
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const SupportRequest = require('../models/schema/supportRequest.model')
const moment = require('moment')

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
    if(!request){
        return res.status(httpStatus.NOT_FOUND).send({"Error" :"Support request with that id is not found"})
    }
    return res.status(httpStatus.OK).send(request)
})

const updateSupportRequest = catchAsync(async (req, res) => {
    const request = await supportRequestService.updateSupportRequestById(req.params.requestId, req)
    return res.status(httpStatus.OK).send(request)
} )

const exportSupportRequest = catchAsync(async (req, res) => {
    const startDate = req.query.hasOwnProperty('startDate') ? req.query.startDate : moment().subtract(1, 'months')
    const endDate = req.query.hasOwnProperty('endDate') ? req.query.endDate : moment.now()
    const sortBy = req.query.hasOwnProperty('sortBy') ? req.query.sortBy : 'desc'
    const limit = req.query.hasOwnProperty('limit') ? req.query.limit : 10000
    res.setHeader('contentType', 'text/csv')
    res.status(200)
    res.setHeader('Content-disposition', 'attachment; filename=' + `requests-${startDate.getTime()/ 1000}--${endDate.getTime() / 1000}.csv`);
    await SupportRequest.find()
        .where('createdAt').gte(startDate)
        .where('createdAt').lte(endDate)
        .sort({createdAt: sortBy})
        .limit(limit)
        .stream()
        .pipe(SupportRequest.csvTransformStream())
        .pipe(res)
})

module.exports = {
    createRequest,
    getSupportRequests,
    getSupportRequest,
    updateSupportRequest,
    exportSupportRequest
}