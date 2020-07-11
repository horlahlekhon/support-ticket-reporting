const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { User } = require('../models')
const config = require('./config')

// options to the jwt package
const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

// Function to be used to verfy user in jwt
const jwtVerify = async (payload, done) => {
    try{
        const user = await User.findById(payload.sub);
        if(!user) {
            return done(null, false)
        }
        done(null, user)
    }catch (e) {
        done(e, null)
    }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {jwtStrategy, }