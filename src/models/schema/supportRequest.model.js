const mongoose = require('mongoose')
const {roles, requestStatus} = require("../config")


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