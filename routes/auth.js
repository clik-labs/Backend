module.exports = auth;

function auth(app, db, randomstring, port){
    app.post('/auth/local/login', (req, res)=>{
        var body = req.body;
        db.Users.findOne({
            email : body.email,
            passwd : body.passwd
        }, (err, result)=>{
            if(err){
                console.log('Login Error!')
                res.status(403).send("DB Error")
                throw err
            }
            else if(result){
                console.log(result.name+' LOGIN')
                res.status(200).send(result)
            }
            else{
                console.log('LOGIN FAILED')
                res.status(401).send("NOT FOUND")
            }
        })
    })

    app.post('/auth/local/register', (req, res)=>{
        var token = randomstring.generate(15)
        var body = req.body;
        var users = new db.Users({
            email : body.email,
            passwd : body.passwd,
            name : body.name,
            token : token,
            profile : "",
            profile_img : 'http://soylatte.kr:'+port+'/profile_img/'+token+'.jpg',
            facebook_id : "",
            interest : "",
            liked_card : [],
            liked_editor : [],
            like : 0,
            alert : []
        })
        db.Users.findOne({
            email : body.email
        }, (err, result)=>{
            if(err){
                console.log("Signup Error!")
                res.status(403).send("DB Error")
                throw err
            }
            else if(result){
                console.log('Already In Database')
                res.status(409).send("Already in Database")
            }
            else{
                users.save((err)=>{
                    if(err){
                        console.log('Signup Error!')
                        res.send(403).send('Signup Error')
                        throw err
                    }
                    else{
                        console.log(body.name+" Signup Success")
                        res.status(200)
                    }
                })

            }
        })
    })

    app.post('/auth/local/authenticate', (req, res)=>{
        var body = req.body;
        db.Users.findOne({
            token : body.token
        },(err, result)=>{
            if(err){
                console.log('/auth/local/authenticate Error')
                res.status(403).send('/auth/local/authenticate Error')
                throw err
            }
            else if(result){
                res.status(200).send(result)
            }
            else{
                res.status(401).send('Save Fail')
            }
        })
    })

}

