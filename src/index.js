const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger')
const path = require('path')

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  const mongoose = require('mongoose')
  const fs = require('fs')
  const {Comment, SupportRequest, User}  = require('./models')

  if(config.env === "development"){
    const commentPath = path.join(__dirname, '../comments.json')
    const usersPath = path.join(__dirname, '../users.json')
    const supportRequests = path.join(__dirname, '../supportRequests.json')
    fs.readFile(usersPath, (err, data) => {
      const json = JSON.parse(data.toString())
      User.find()
        .then((data, er) => {
          if(data.length === 0 ) {
            json.forEach( e => {
              e.password = "password1"
              User.create(e)
              }
            )
          }
        })
    })
    fs.readFile(supportRequests, (err, data) => {
      const json = JSON.parse(data.toString())
      SupportRequest.find()
        .then((data, err) => {
          if(data.length === 0 ){
            json.forEach(e => {
              SupportRequest.create(e)
            })
          }
        })

    })

    fs.readFile(commentPath,  (err, data) => {
      const json = JSON.parse(data.toString())
      Comment.find()
        .then((data, err) => {
          if(data.length === 0 ) {
            json.forEach(e => {
              Comment.create(e)
            })
          }
        })
    })
  }
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
