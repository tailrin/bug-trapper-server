const app = require('./app')
const knex = require('knex')
const {DB_URL} = require('./config')
require('dotenv').config();

const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.set('db', db)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})


