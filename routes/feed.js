module.exports = feed;

function feed(app, db){
    app.post('/feed/recommend', (req, res)=>{
        var userinter;
        var body = req.body;
        db.Users.findOne({
            token : body.token
        }, (err, result)=>{
            if(err){
                console.log('/feed/recommend user find Error')
                res.status(403).send('/feed/recommend user fine Error')
                throw err
            }
            else if(result){
                userinter = result.interest
            }
            else{
                res.status(404).send('User Not Founded')
            }
        })
        db.Cards.find({

        })
    })


}