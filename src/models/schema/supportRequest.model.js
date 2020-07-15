const mongoose = require('mongoose')
const {roles, requestStatus} = require("../config")
const mongooseToCsv = require('mongoose-to-csv')


const supportRequest = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        requestStatus: {
            type: String,
            required: false,
            validate(value){
                if(!Object.values(requestStatus).find(e => e === value)){
                    throw new Error(`status must be within: ${Object.values(requestStatus)}`);
                }
            }
        },
        dateClosed: {
            type: Date,
            required: false
        }
    },

    {
        timestamps: true
    }

)

supportRequest.plugin(mongooseToCsv, {
    headers: 'Title Description CreatedAt user',
    constraints: {
        'Title': 'title',
        'Description': 'description',
        'CreatedAt': 'createdAt',
        'user': 'userId'
    }
})

supportRequest.pre('save',  async function(next) {
    const request = this
    if (request.isModified('requestStatus') && request.requestStatus === requestStatus.closed){
        request.dateClosed = new Date()
        request.markModified('dateClosed')
    }
    next()
})

/**
 * @typedef SupportRequest
 */
const SupportRequest = mongoose.model('SupportRequest', supportRequest)

module.exports  = SupportRequest