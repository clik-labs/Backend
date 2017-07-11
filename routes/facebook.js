module.exports = facebook;
function facebook(app, db, passport, FacebookStrategy) {
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
        clientSecret : 'e0dcace8cf7df0776b5c0011a1579ece'
    }, (accessToken, refreshToken, profile, done)=>{
        console.log(profile)
        User.findOne({
            facebook_id : profile.id
        }, (err, result)=>{
            if(err){
                console.log('Facebook Login Error!')
                res.status(500).send("DB Error")
                throw err
            }
            else if(!result){
                var user = new db.Users({
                    email : profile.email,
                    name : profile.displayName,
                    token : randomstring.generate(15),
                    profile : "",
                    profile_img : 'http://soylatte.kr:'+port+'/img/'+token,
                    facebook_id : profile.id,
                    interest : "",
                    liked_card : [],
                    liked_editor : [],
                    like : 0,
                    alert : []
                })
                user.save((err)=>{
                    if(err){
                        console.log('Facebook Save Error!')
                        throw err
                        res.status(500).send('Facebook Save Error')
                    }
                    else{
                        console.log(profile.displayName+" Facebook Login Success")
                        done(null, user)
                    }
                })
            }
            else if(result){
                done(null, profile)
            }
        })

    }))

    app.get('/auth/facebook',
        passport.authenticate('facebook', { scope : ['email', 'public_profile', 'read_stream', 'publish_actions']})
    )

}