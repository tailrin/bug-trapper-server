const app = require('../src/app');
const knex = require('knex')
const config = require('../src/config')
const helper = require('./test-helpers')
require('dotenv').config();




describe('App', () => {

	
	let db
	before('make knex instance', () => {
		db = knex({
		  client: 'pg',
		  connection: config.TEST_DB_URL,
		})
		app.set('db', db)
	})


	// after('disconnect from db', () => db.destroy())
	before('clean the table', () => db.raw('TRUNCATE issue_notes, issues, projects, users RESTART IDENTITY CASCADE'))

	before('seed users', () => {
		return helper.seedUsers(db);
	})
	

	
	afterEach('cleanup', () => db.raw('TRUNCATE issue_notes, issues, projects, users RESTART IDENTITY CASCADE'))

	it('GET / responds with 200 containing Hello, world!', () => {
		return supertest(app)
		.get('/')
		.expect(200, 'Hello, world!')

	});

	

	context('given no issues', () => {
		it('GET /projects responds with empty list', () => {
			return supertest(app)
			.get(`/projects?user_id=3`)
			.set('Authorization', process.env.AUTH_TOKEN)
			.expect(200, [])
		})
	})

	
})