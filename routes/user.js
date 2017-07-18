module.exports = user;
function user(app, db) {
    app.post('/user/info', (req, res)=>{
        var body = req.body;
        db.Users.findOne({
            email : body.email
        },(err, uresult)=>{
            if(err){
                console.log('/user/info userfind Error')
                res.status(403).send('/user/info userfind Error')
                throw err
            }
            else if(uresult){
                console.log(uresult.token)
                db.Cards.find({
                    token : uresult.token
                },(err, cresult)=>{
                    if(err){
                        console.log('/user/info cardfind Error')
                        res.status(403).send('/user/info cardfind Error')
                        throw err
                    }
                    else if(cresult){
                        var response = ([
                            uresult,cresult
                        ])
                        res.status(200).send(response)
                    }
                })
            }
        })
    })
}