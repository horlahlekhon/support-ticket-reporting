const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
    {
        supportRequest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SupportRequest',
            request: true
        },
        comment: {
            type: String,
            required: true
        },
        fromCustomer: {
            type: Boolean,
            require : false
        },
        commenter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    },
    {
        timestamps: true
    }
)
/**
 * @typedef SupportRequest
 */
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment