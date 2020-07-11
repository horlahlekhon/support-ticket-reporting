const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const httpStatus = require('http-status');
const routes = require('./routes')
const passport = require('passport');
const {jwtStrategy} = require("./config/passport");
const { errorConverter, errorHandler } = require('./middlewares/errors.middleware');

const app = express()
app.use(helmet())
app.use(express.json())
app.use(cors())
app.options('*', cors())

app.use(passport.initialize())

passport.use('jwt', jwtStrategy);

app.use('/api', routes)

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);


module.exports = app