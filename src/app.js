require('dotenv').config()
const express = require('express')
const { sendEmail, emailOptions } = require('./herpers/nodemailer')
const fs = require('fs')
const cors = require('cors')
const helmet = require('helmet');
const actorsRouter = require('./routers/actors')
const directorsRouter = require('./routers/directors')
const usersRouter = require('./routers/users')
const login = require('./routers/auth')
const logger = require('morgan')
const { users } = require('../src/models')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const hbs = require('nodemailer-express-handlebars')
const { options } = require('./routers/actors')


const app = express();




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', actorsRouter)
app.use('/api/v1', directorsRouter)
app.use('/api/v1', usersRouter)
app.use('/api/v1', login);
app.get('/api/v1', (req, res, next) => {
  try {
    res.send('<h1>Bienvenido a mi REST API</h1>')
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) => {
  if (err.name = 'SequelizeValidationError') {
    const errObj = {};
    err.errors.map( er => {
        errObj[er.path] = er.message;
    })
    return res.status(400).json(errObj);
  } 
  res.status(500).send('Ups, tenemos un problema en el servidor, intentelo mas tarde!');
});

 
 app.use(logger('combined', { stream: fs.createWriteStream(('./access.log'), { flags: 'a' })}))

  
module.exports = app;