module.exports = self;

function self(app, db, multer, session, port, randomstring, fs){
    var filename;
    var filestorage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, 'profile_img/')
        },
        filename: (req, file, cb)=>{
            filename = randomstring.generate(15)
            cb(null, filename+'.png')
        }
    })

    var upload = multer({ storage : filestorage })

    /*UserData 검색해서 전달*/
    app.post('/self/info', (req, res)=>{
        var body = req.body
        db.Users.findOne({
            token : body.token
        }, (err, uresult)=>{
            if(err){
                console.log('/self/info userfind Error')
                res.status(403).send('/self/info userfind Error')
                throw err
            }
            else if(uresult){
                db.Cards.find({
                    token : body.token
                }, (err, cresult)=>{
                    if(err){
                        console.log('/self/info cardfind Error')
                        res.status(403).send('/self/info cardfind Error')
                        throw err
                    }
                    else if(cresult){
                        var response = ([
                            uresult, cresult
                        ])
                    }
                })
            }
            else{
                res.status(404).send('User Not Founded')
            }
        })
    })

    /*내가 작성한글 검색해서 전달*/
    app.post('/self/info/card',(req, res)=>{
        var body = req.body
        db.Cards.find({
            token : body.token
        },(err, result)=>{
            if(err){
                console.log('/self/info/card cardfind Error')
                res.status(403).send('/self/info/card cardfind Error')
                throw err
            }
            else if(result[0]!=undefined){
                res.status(200).send(result)
            }
            else{
                res.status(404).send('Data Not Founded')
            }
        })
    })

    app.post('/self/info/update', (req, res)=>{
        var body = req.body
        db.Users.update({
            token : body.token
        }, {$set:{name:body.name, profile:body.profile}},(err)=>{
            if(err){
                console.log('/self/info/update userupdate Error')
                res.status(403).send('/self/info/update userupdate Error')
                throw err
            }
            else{
                db.Users.findOne({
                    email : body.token
                },(err, uresult)=>{
                    if(err){
                        console.log('/self/info/update userfind Error')
                        res.status(403).send('/self/info/update userfind Error')
                        throw err
                    }
                    else if(uresult){
                        console.log(uresult.token)
                        db.Cards.find({
                            token : uresult.token
                        },(err, cresult)=>{
                            if(err){
                                console.log('/self/info/update cardfind Error')
                                res.status(403).send('/self/info/update cardfind Error')
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
                    else {
                        res.status(404).send('User Not Founded')
                    }
                })
            }
        })
    })


    /*관심사 수정*/
    app.post('/self/info/update/like', (req, res)=>{
        var body = req.body
        db.Users.update({
            token : body.token
        },{$set:{liked:body.likes}},(err)=>{
            if(err){
                console.log('/self/info/update/like update Error')
                res.status(403).send('/self/info/update/like update Error')
                throw err
            }
            else{
                db.Users.findOne({
                    token : body.token
                },(err, result)=>{
                    if(err){
                        console.log('/self/info/update/like userfind Error')
                        res.status(403).send('/self/info/update/like userfind Error')
                        throw err
                    }
                    else if(result){
                        res.status(200).send(result)
                    }
                    else{
                        res.status(404).send('Data Not Founded')
                    }
                })
            }
        })
    })

    /*프로필 사진업데이트 API*/
    app.post('/self/info/update/photo',upload.single('file'), (req, res)=>{
        var body = req.body
        console.log('======== FILE ========')
        console.log(req.file)
        console.log('========= END =========')
        console.log('REQ_TOKEN == '+body.token)
        db.Users.findOne({
            token : body.token
        },(err, result)=>{
            if(err){
                console.log('/self/info/update/photo userfind Error')
                res.status(403).send('/self/info/update/photo userfind Error')
                throw err
            }
            else if(result){
                console.log('======== RESULT ========')
                console.log(result)
                console.log('========= END =========')
                if(result.img_name){
                    fs.unlink(result.img_name,(err)=>{
                        if(err){
                            console.log('/self/info/update/photo filedelete Error')
                            res.status(403).send('/self/info/update/photo filedelete Error')
                            throw err
                        }
                    })
                }
            }
            db.Users.update({
                "token" : body.token
            },{$set:{"profile_img":'http://soylatte.kr:'+port+'/'+req.file.path, img_name:'./'+req.file.path}},(err, results)=>{
                if(err){
                    console.log('/self/info/update/photo userupdate Error')
                    res.status(403).send('/self/info/update/photo userupdate Error')
                    throw err
                }
                else if(results.nModified == 1){
                    db.Users.findOne({
                        token : body.token
                    }, (err, result)=>{
                        if(err){
                            console.log('/self/info/update/photo updatefind Error')
                            res.status(403).send('/self/info/update/photo updatefind Error')
                            throw err
                        }
                        else if(result){
                            res.status(200).send(result)
                        }
                    })
                }
                else{
                    res.status(404).send('Not Changed')
                }
            })
        })

    } )

    /*읽어본 카드 리스트*/
    app.post('/self/history', (req, res)=>{
        var body = req.body;
        db.Users.findOne({
            token : body.token
        }, (err, result)=>{
            if(err){
                console.log('/self/history userfind Error')
                res.status(403).send('/self/history userfind Error')
                throw err
            }
            else if(result){
                res.status(200).send(result.view_log)
            }
            else {
                res.status(404).send('Data Not Founded')
            }
        })
    })

    /*좋아요한 카드*/
    app.post('/self/favorite', (req, res)=>{
        var body = req.body
        db.Users.findOne({
            token : body.token
        },(err, result)=>{
            if(err){
                console.log('/self/favorite userfind Error')
                res.status(403).send('/self/favorite userfind Error')
                throw err
            }
            else if(result){
                res.status(200).send(result.favorite)
            }
            else{
                res.status(404).send('Data Not Founded')
            }
        })
    })

    /*일림내역 response*/
    app.post('/self/notification', (req, res)=>{
        var body = req.body
        db.Users.findOne({
            token : body.token
        }, (err, result)=>{
            if(err){
                console.log('/self/notification userfind Error')
                res.status(403).send('/self/notification userfind Error')
                throw err
            }
            else if(result){
                db.Notifications.find({
                    notificationid : result.notification
                },(err, result)=>{
                    if(err){
                        console.log('/self/notification notification find Error')
                        res.status(403).send('/self/notification notification find Error')
                        throw err
                    }
                    else if(result){
                        res.status(200).send(result)
                    }
                    else{
                        res.status(404).send('Data Not Founded')
                    }
                })
            }
            else {
                res.status(404).send('User Not Founded')
            }
        })
    })
}