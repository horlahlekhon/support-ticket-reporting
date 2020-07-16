const Joi = require('@hapi/joi')
const dotEnv = require('dotenv')
const path = require('path')

dotEnv.config({path: path.join(__dirname, '../../.env')})

const environmentVarScheme = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('development', 'test', 'eval').required(),
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required().description('Mongo url'),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(500).description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    }).unknown()

const { value: envVars, error } = environmentVarScheme.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}


module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: 10,
    }
};
