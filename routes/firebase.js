module.exports = firebase;

function firebase(app, db, fcm) {
    app.post('/firebase/update', (req, res)=>{
        var body = req.body;
        db.Users.update({
            token : body.token
        }, {$set:{firebase_token:body.firebase_token}}, (err)=>{
            if(err){
                console.log('/firebase/update update Error')
                res.status(403).send('/firebase/update update Error')
                throw err
            }
            else {
                res.send(200)
            }
        })
    })
}