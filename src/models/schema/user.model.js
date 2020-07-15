const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const {roles} = require("../config");


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate(mail) {
                if(!validator.isEmail(mail)){
                    throw new Error("Invalid email")
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            // select: false, TODO find a way to not include password in user get and wont affect isPasswordMatch()
            minlength: 8,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number');
                }
            },
            private: true, // used by the toJSON plugin
        },
        role: {
            type: String,
            required: false,
            trim: true,
            enum: roles,
            default: 'customer'
        }
    },
    {
        timestamps: true
    }
)


/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
// userSchema.statics.isEmailTaken = async (email, excludeUserId) => {
//     console.log(`find one typeee: ${typeof this.findOne}`)
//     console.log({...this})
//     const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//     return !!user;
// }

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User