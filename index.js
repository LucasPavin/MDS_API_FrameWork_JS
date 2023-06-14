const express = require('express');
const routes = require('./routes/routes')
const db = require('./db/db')
require('./middleware/auth')

const app = express()

db()
// Permet de parser
app.use(express.json())
app.use(routes)
app.listen(8080, () => console.log('Je tourne sur le port 8080'))