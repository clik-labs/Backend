module.exports = facebook;

function facebook(app, db, passport, FacebookStrategy, port, randomstring) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done)=>{
        done(null, user);
    });

    passport.deserializeUser((obj, done)=>{
        done(null, obj);
    });

    passport.use(new FacebookStrategy({
        clientID : "841107499390440",
        clientSecret : "e0dcace8cf7df0776b5c0011a1579ece",
    }, (accessToken, refreshToken, profile, done)=>{
        console.log('PROFILE')
        console.log(profile)
        done(null, profile)
        // db.Users.findOne({
        //     facebook_id : profile.id
        // }, (err, result)=>{
        //     if(err){
        //         console.log('Facebook Login Error!')
        //         res.status(500).send("DB Error")
        //         throw err
        //     }
        //     else if(!result){
        //         var token = randomstring.generate(15)
        //         var user = new db.Users({
        //             email : profile.emails[0].value,
        //             name : profile.name.familyName+profile.name.givenName,
        //             token : token,
        //             profile : "",
        //             profile_img : 'http://soylatte.kr:'+port+'/img/'+token+'.jpg',
        //             facebook_id : profile.id,
        //             interest : "",
        //             liked_card : [],
        //             liked_editor : [],
        //             like : 0,
        //             alert : []
        //         })
        //         user.save((err)=>{
        //             if(err){
        //                 console.log('Facebook Save Error!')
        //                 throw err
        //             }
        //             else{
        //                 console.log(profile.name.familyName+profile.name.givenName+" Facebook Login Success")
        //                 done(null, profile)
        //             }
        //
        //         })
        //     }
        //     else if(result){
        //         done(null, profile)
        //     }
        // })

    }))

    app.get('/auth/facebook/token', passport.authenticate('facebook-token'), (req, res)=>{
        console.log('USER_TOKEN ==== '+req.param('access_token'));
        console.log(req.user)
        console.log(req.user.emails[0].value)
        console.log(req.user.name.familyName+req.user.name.givenName)
        res.send(200)
        /*
         if(req.user){
         db.CardInfo.findOne({
         Email : req.user.emails[0].value,
         },(err, result)=>{
         if(err){
         console.log('/facebook/token Error')
         throw err
         }
         else if(result){
         res.send(200, result)
         }
         else{
         res.send(401, "Data Not Founded")
         }
         })
         }
         else if(!req.user){
         res.send(401, "Can't find User On Facebook. It May Be Unusable.");
         }*/
    });

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook-token',
            {
                successRedirect: '/',
                failureRedirect: '/'
            }));

}