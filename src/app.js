require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config')
const winston = require('winston');
const IssuesRouter = require('./routers/issues-routers')
const ProjectsRouter = require('./routers/projects-routers')
const IssuesNotesRouter = require('./routers/issue-notes-routers')
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
	  new winston.transports.File({ filename: 'info.log' })
	]
  });
  
if (NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: winston.format.simple()
	}));
}

const app = express()

const morganOption = (NODE_ENV === 'production')
	? 'tiny'
	: 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use('/issues', IssuesRouter)
app.use('/projects', ProjectsRouter)
app.use('/issue_notes', IssuesNotesRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.use(function errorHandler(error, req, res, next){
	let response
	if (NODE_ENV === 'production'){
		response = { error: { message: 'server error' } }
	} else {
		console.error(error)
		response = { message: error.message, error }
	}
	res.status(500).json(response)
})
app.get('/', (req, res) => {
	res.json('Hello, world!')
})

module.exports = app