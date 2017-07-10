var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.urlencoded({
    extended : false
}))

app.listen(8899, ()=>{
    console.log('Server Running At 8899 Port!')
})