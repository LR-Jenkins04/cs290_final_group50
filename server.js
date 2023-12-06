var html = require('html')
var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')

var app = express()
var port = process.env.PORT || 3000

app.get('/', function(req, res, next){
	res.status(200)
	res.setHeader("Content-Type", "text/html")
	res.write("<html><body><h1>welcome to the final project page</h1></body><html>")
})


app.get('*', function(req, res, next){
	res.status(404)
	res.setHeader("Content-Type", "text/html")
	res.write("<html><body><h1>404 error</h1></body><html>")
})

app.listen(port, function() {
	console.log("== Server is listening on port ", port)
})
