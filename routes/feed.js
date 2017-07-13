module.exports = feed;

function feed(app, db){
    app.post('/feed/recommend', (req, res)=>{
        var userinter = new Array();
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
            "$or": userinter
        }, (err, result)=>{
            if(err){
                console.log('/feed/recommend cardfind Error')
                res.status(403).send('/feed/recommend cardfind Error')
                throw err
            }
            else if(result){
                res.status(200).send(result)
            }
            else{
                res.status(404).send('Card Not Founded')
            }
        })
    })

    app.post('/feed/type', (req, res)=>{
        var body = req.body
        db.Cards.find({
            "$or": body.Number
        },(err, result)=>{
            if(err){
                console.log('/feed/type Error')
                res.status(403).send('/feed/type Error')
                throw err
            }
            else if(result){
                res.status(200).send(result)
            }
            else {
                res.status(404).send("Not Founded Card")
            }
        })
    })

    app.post('/feed/search', (req, res)=>{

    })
}
