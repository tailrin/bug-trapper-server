const app = require('./app')
const knex = require('knex')
require('dotenv').config();

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
})

app.set('db', db)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})


