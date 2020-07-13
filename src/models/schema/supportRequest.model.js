const mongoose = require('mongoose')
const {roles} = require("../config")

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
        }
    },

    {
        timestamps: true
    }

)
/**
 * @typedef SupportRequest
 */
const SupportRequest = mongoose.model('SupportRequest', supportRequest)

module.exports  = SupportRequest