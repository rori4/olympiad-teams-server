const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const fileUpload = require('express-fileupload');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(passport.initialize())
  app.use(cors())
  app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));
  console.log('Express ready!')
}
