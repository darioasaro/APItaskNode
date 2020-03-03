const express = require('express')
const app = express()
const port = 3000
const routes = require( '../routes/routes' )
const morgan = require('morgan')
require('dotenv').config()
const process = require('process')


app.use( morgan( "dev") );
routes(app)

app.get("*", (req, res) => res.status(400).send({
	message: "No se encuentra el recurso"
}));

process.on('uncaughtException', function (err) {
	console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
	
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))