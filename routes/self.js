module.exports = self;

function self(app, db){

    /*UserData 검색해서 전달*/
    app.post('/self/info', (req, res)=>{

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
            else if(result){
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
                    token : body.token
                },(err, result)=>{
                    if(err){
                        console.log('/self/info/update userfind Error')
                        res.status(403).send('/self/info/update userupdate Error')
                        throw err
                    }
                    else if(result){
                        /* 이부분 수정해야함
                        res.status(200).send(result)
                        */
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
    app.post('/self/info/update/photo', (req, res)=>{

    })

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
                console.log('/self/favorate userfind Error')
                res.status(403).send('/self/favorate userfind Error')
                throw err
            }
            else if(result){
                res.status(200).send(result.favorate)
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
        },(err, result)=>{
            if(err){
                console.log('/self/notification userfind Error')
                res.send(403).send('/self/notification userfind Error')
                throw err
            }
            else if(result){
                res.send(200).send(result.notification)
            }
            else {
                res.status(404).send('Data Not Founded')
            }
        })
    })

}