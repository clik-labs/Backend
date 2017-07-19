var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/cardline', (err)=>{
    if(err){
        console.log('DB Error!')
        throw err
    }
    else {
        console.log('DB Connect Success')
    }
});

mongoose.Promise = global.Promise;

var CommentSchema = mongoose.Schema({
    token : {type: String},
    card_token: {type: String},
    writer_profile: {type: String},
    writer: {type: String},
    date: {type: String},
    comment: {type: String}
});

var CardSchema = mongoose.Schema({
    category : {type:Number},
    card_token: {type: String},
    card_page : {type: Number},
    title: {type: String},
    writer: {type: String},
    token : {type: String},
    like: {type: Number},
    date: {type: String},
    news_detail: {type: Array}
});

//liked 관심사
//favorite 좋아요 누른 카드

var UsersSchema = mongoose.Schema({
    email: {type: String},
    passwd: {type: String},
    firebase_token: {type: String},
    name: {type: String},
    token: {type: String},
    profile: {type: String},
    profile_img: {type: String},
    img_name : {type:String},
    facebook_id: {type: String},
    liked: [Number],
    favorite : [String],
    view_log : [String],
    search_log: [String],
    notification : [String]
});

var NotificationSchema = mongoose.Schema({
    notificationid : {type: String},
    userFrom : {type: String},
    userFromEmail : {type: String},
    isComment : {type: Boolean},
    originCardToken : {type :String},
    content : {type:String}
})

Comment = mongoose.model('Comment', CommentSchema);
Users = mongoose.model("User", UsersSchema);
Cards = mongoose.model("Card", CardSchema);
Notifications = mongoose.model("Notification", NotificationSchema)
exports.Users = Users;
exports.Cards = Cards;
exports.Comment = Comment
exports.Notifications = Notifications
exports.db = db;
