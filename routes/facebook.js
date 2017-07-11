module.exports = facebook;
function facebook(app, db, passport, FacebookStrategy, port, randomstring) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new FacebookStrategy({
        clientID : '841107499390440',
        clientSecret : 'e0dcace8cf7df0776b5c0011a1579ece',
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'verified'],
    }, (req, accessToken, refreshToken, profile, done)=>{
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
                    profile_img : 'http://soylatte.kr:'+port+'/img/'+token+'.jpg',
                    facebook_id : profile.id,
                    interest : "",
                    liked_card : [],
                    liked_editor : [],
                    like : 0,
                    alert : []
                })
                console.log(user)
                user.save((err)=>{
                    if(err){
                        console.log('Facebook Save Error!')
                        throw err
                    }
                    else{
                        console.log(profile.displayName+" Facebook Login Success")
                        req.session.data = result
                        done(null, user)
                    }
                })
            }
            else if(result){
                req.session.data == result
                done(null, result)
            }
        })

    }))

    app.get('/auth/facebook/token',
        passport.authenticate('facebook', { scope : ['email', 'public_profile', 'read_stream', 'publish_actions']})
    )

    app.get('/success', (req, res)=>{
        res.status(200).send(req.session.data)
    })

    app.get('/fail', (req, res)=>{
        res.status(500).send("로그인 실패")
    })


    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/success',
            failureRedirect: '/fail'
        }));

}