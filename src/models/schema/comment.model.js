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
        fromMe: {
            type: Boolean,
            require : true
        },
        commenter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
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