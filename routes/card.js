module.exports = card;

function card(app, db){

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

    })

    app.post('/card/post/uploadimage', (req, res)=>{

    })

    app.post('/card/post/edit', (req, res)=>{

    })
}