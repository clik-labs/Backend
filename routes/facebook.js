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
        console.log('==================== FACEBOOK ====================')
        console.log('======== PROFILE ========')
        console.log(profile)
        db.Users.findOne({
            facebook_id : profile.id
        }, (err, result)=>{
            if(err){
                console.log('Facebook Login Error!')
                res.status(500).send("DB Error")
                throw err
            }
            else if(!result){
                var token = randomstring.generate(15)
                var user = new db.Users({
                    email : profile.emails[0].value,
                    name : profile.name.familyName+profile.name.givenName,
                    token : token,
                    profile : "",
                    profile_img : profile.photos[0].value,
                    facebook_id : profile.id,
                    favorite : [],
                    liked : [],
                    view_log : [],
                    serch_log : [],
                    alert : []
                })
                user.save((err)=>{
                    if(err){
                        console.log('Facebook Save Error!')
                        throw err
                    }
                    else{
                        console.log(profile.name.famyName+profile.name.givenName+" Facebook Login Success")
                        done(null, profile)
                    }

                })
            }
            else if(result){
                done(null, profile)
            }
        })
    }))

    app.get('/auth/facebook/token', passport.authenticate('facebook-token'), (req, res)=>{
        console.log("USER_TOKEN ==== " + req.param('access_token'));
        console.log(req.user)
        console.log(req.user.emails[0].value)
        console.log(req.user.name.familyName+req.user.name.givenName)
        if(req.user){
            db.Users.findOne({
                facebook_id : req.user.id
            },(err, result)=>{
                if(err){
                    console.log('/auth/facebook/token userfind Error')
                    res.status(403).send('/auth/facebook/token userfind Error')
                    throw err
                }
                else if(result){
                    console.log('======== USER_INFO ========')
                    console.log(result)
                    console.log('==================== END ====================')
                    res.status(200).send(result)
                }
                else{
                    res.status(404).send('Data Not Founded')
                }
            })
        }
        else if(!req.user){
            res.send(401, "Can't find User On Facebook. It May Be Unusable.");
        }
    });

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook-token',
            {
                successRedirect: '/',
                failureRedirect: '/'
            }));

}