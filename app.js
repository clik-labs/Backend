var express = require('express')
var session = require('express-session')
var FCM = require('fcm-push')
const firebase_token = 'AIzaSyAQTYfYZXMrrxwt1kaA3lbBEQSrb9Bw6Q4'
var fcm = FCM(firebase_token)
var fs = require('fs')
var port = process.env.PORT||8989;
var bodyParser = require('body-parser')
var app = express()
var multer = require('multer')
var moment = require('moment')
var randomstring = require('randomstring')
var fcm = require('fcm-node')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook-token')
var db = require('./mongo/database')

app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/card_img',express.static('card_img'))
app.use('/profile_img', express.static('profile_img'))
app.use(express.static('views'))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

require('./routes/auth')(app, db, randomstring, port)
require('./routes/facebook')(app, db, passport, FacebookStrategy, port, randomstring)
require('./routes/card')(app, db, multer, randomstring, moment, fcm)
require('./routes/feed')(app, db)
require('./routes/self')(app, db, multer, session, port, randomstring, fs)
require('./routes/user')(app, db)
require('./routes/firebase')(app, db, fcm)

app.listen(port, ()=>{
    console.log('Server Running At '+port+' Port!')
})

