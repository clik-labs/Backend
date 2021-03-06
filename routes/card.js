module.exports = card;

function card(app, db, multer, randomstring, moment, fcm){
    var toomany;
    var randomArr = new Array();
    var randomKey = 0;
    var filestorage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, 'card_img/')
        },
        filename: (req, file, cb)=>{
            cb(null, randomArr[randomKey])
            randomKey++;
        }
    })

    var upload = multer({ storage : filestorage })

    app.post('/card/info', (req, res)=>{
        var body = req.body;
        var arr = new Array()
        db.Cards.find({
            card_token : body.card_token
        },(err, result)=>{
            if(err){
                console.log('/card/info cardfind Error')
                res.status(403).send('/card/info cardfind Error')
                throw err
            }
            else if(result){
                db.Users.fineOne({
                    token : body.token
                }, (err, result)=>{
                    if(err){
                        console.log('/card/info userfind Error')
                        res.status(403).send('/card/info userfind Error')
                        throw err
                    }
                    else if(result){
                        arr = result.search_log.unshift(card_token)
                        db.Users.update({
                            token : body.token
                        },{$set:{"serch_log":arr}}, (err)=>{
                            if(err){
                                console.log('/card/info update Error')
                                res.status(403).send('/card/info update Error')
                                throw err
                            }
                        })
                    }
                })
                res.status(200).send(result)
            }
            else{
                res.status(404).send('Not Founded Card')
            }
        })

    })

    app.post('/card/info/comment', (req, res)=>{
        var body = req.body
        db.Comment.find({
            card_token : body.card_token
        },(err, result)=>{
            if(err){
                console.log('/card/info/comment find Error')
                res.status(403).send('/card/info/comment find Error')
                throw err
            }
            else if(result){
                res.status(200).send(result)
            }
            else{
                res.status(404).send('Comment Not Founded')
            }
        })
    })

    app.post('/card/like', (req, res)=>{
        var arr = new Array()
        var body = req.body
        db.Users.findOne({
            token : body.token
        },(err, result)=>{
            if(err){
                console.log('/card/like find Error')
                res.status(403).send('/card/like find Error')
                throw err
            }
            else if(result){
                arr = result.liked_card.unshift(body.card_token)
                db.Users.update({
                    token : body.token
                },{$set:{"liked_card":arr}},(err)=>{
                    if(err){
                        console.log('/card/like update Error')
                        res.status(403).send('/card/like update Error')
                        throw err
                    }
                    else{
                        res.status(200)
                    }
                })
            }
            else{
                res.status(404)
            }
        })
    })

    app.post('/card/dislike', (req, res)=>{
        var arr = new Array()
        var body = req.body
        db.Users.findOne({
            token : body.token
        },(err, result)=>{
            if(err){
                console.log('/card/dislike userfind Error')
                res.status(403).send('/card/dislike userfind Error')
                throw err
            }
            else if(result){
                arr = result.liked_card.pop(body.card_token)
                db.Cards.update({
                    token : body.token
                },{$set:{liked_card:arr}},(err)=>{
                    if(err){
                        console.log('/card/dislike update Error')
                        res.status(403).send('/card/dislike update Error')
                        throw err
                    }
                    else {
                        res.status(200)
                    }
                })
            }
            else{
                res.status(404)
            }
        })
    })

    app.post('/card/post', (req, res)=>{
        var body = req.body;
        const time = moment().format('YYYY년 MM월 DD일 h:mm A');
        console.log('======== ARRAY ========')
        arrset()
        var get = JSON.parse(body.news_detail)
        console.log('========= END =========')
        console.log('======== BODY ========')
        console.log(body)
        console.log('======== END =========')
        console.log('NEWS_DETAIL Type ==== '+typeof get)
        db.Users.findOne({
            token : body.token
        }, (err, result)=>{
            if(err){
                console.log('/card/post userfind Error')
                res.status(403).send('/card/post userifnd Error')
                throw err
            }
            else if(result){
                var data = new db.Cards({
                    category : body.category,
                    card_page : body.card_page,
                    card_token : randomstring.generate(15),
                    token : result.token,
                    title : body.title,
                    writer : result.name,
                    date : time,
                    like : 0,
                    news_detail : imagename(get)
                })
                console.log('======== CARD ========')
                console.log(data)
                console.log('========= END =========')
                data.save((err)=>{
                    if(err){
                        console.log('/card/post save Error')
                        res.status(403).send('/card/post save Error')
                        throw err
                    }
                    else{
                        res.status(200).send(data)
                    }
                })
            }
            else{
                res.status(404).send('User Not Founded')
            }
        })

    })

    app.post('/card/post/uploadimage', upload.array('file'), (req, res)=>{
        var files = req.files
        console.log('======== FILES ========')
        console.log(files)
        console.log('========= END =========')
        randomKey = 0;
    })

    app.post('/card/post/edit', (req, res)=>{

    })

    function arrset() {
        for (var i=0;i<30;i++){
            randomArr[i] = randomstring.generate(15)+'.png'
        }
        console.log(randomArr)
    }

    function imagename(json){
        var count = 0;
        console.log('JSON = '+json)
        console.log('JSON_LENGTH = '+json.length)
        for (var i=0;i<json.length; i++){
            json[i].main_img = 'http://soylatte.kr:8989/card_img/'+randomArr[count];
            count++;
            json[i].res_back = 'http://soylatte.kr:8989/card_img/'+randomArr[count];
            count++;
            console.log(json[i].res_count[0])
            for (var j=0; j<json[i].res_count[0];j++){
                json[i].res_img[j].img = 'http://soylatte.kr:8989/card_img/'+randomArr[count]
                count++
                console.log(json[i].res_img[j].img)
            }
        }
        console.log("======== REFACTOR ========")
        console.log(json)
        console.log("========== END ===========")
        return json
    }

    app.post('/card/commnet', (req, res)=>{
        var body = req.body;
        const time = moment().format('YYYY년 MM월 DD일 h:mm A');
        db.Users.findOne({
            token : body.token
        }, (err, uresult)=>{
            if(err){
                console.log('/card/comment userfind Error')
                res.status(403).send('/card/comment userfind Error')
                throw err
            }
            else if(uresult){
                db.Cards.findOne({
                    card_token : body.card_token
                },(err, cresult)=>{
                    if(err){
                        console.log('/card/comment cardfind Error')
                        res.status(403).send('/card/comment cardfind Error')
                        throw err
                    }
                    else if(cresult){
                        db.Users.findOne({
                            token : cresult.token
                        },(err, wresult)=>{
                            if(err){
                                console.log('/card/comment userfind Error')
                                res.status(403).send('/card/comment userfind Error')
                                throw err
                            }
                            else if(wresult){
                                var comments = new db.Comment({
                                    token : body.token,
                                    card_token : body.card_token,
                                    writer_profile : uresult.email,
                                    writer : uresult.name,
                                    date : time,
                                    comment : body.comment
                                })
                                comments.save((err)=>{
                                    if(err){
                                        console.log('/card/comment cardsave Error')
                                        res.status(403).send('/card/comment cardsave Error')
                                        throw err
                                    }
                                    else {
                                        var message = {
                                            to : wresult.firebase_token,
                                            //collapse_key : '<insert-collapse-key>',
                                            data : comments,
                                            notification : {
                                                title : wresult.name+'님의 카드에'+uresult.name+'님이 댓글을 달았습니다.',
                                                body : body.comments
                                            }
                                        };
                                        fcm.send(message, (err)=>{
                                            if(err){
                                                res.status(403).send('fcm Error')
                                                console.log('fcm Error')
                                            }
                                            else {
                                                console.log('PUSH')
                                                res.status(200).send('push success')
                                            }
                                        })
                                    }
                                })

                            }
                        })
                    }

                })
            }
        })
    })
}