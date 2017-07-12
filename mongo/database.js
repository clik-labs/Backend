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

var comment = mongoose.Schema({
    card_token: {type: String},
    writer_profile: {type: String},
    writer: {type: String},
    date: {type: String},
    summary: {type: String},
});

var CardSchema = mongoose.Schema({
    category : {type: String},
    token : {type: String},
    card_token: {type: String},
    title: {type: String},
    writer: {type: String},
    subtitle: {type: String},
    like: {type: Number},
    date: {type: String},
});

var UsersSchema = mongoose.Schema({
    email: {type: String},
    passwd: {type: String},
    name: {type: String},
    token: {type: String},
    profile: {type: String},
    profile_img: {type: String},
    facebook_id: {type: String},
    interest: {type: String},
    liked_card: [String],
    liked_editor: [String],
    search_log: {type: Array},
    alert: [{
        title: {type: String},
        summary: {type: String}
    }]
});

Comment = mongoose.model('Comment', comment)
Users = mongoose.model("users", UsersSchema);
Cards = mongoose.model("Cards", CardSchema);
exports.Users = Users;
exports.Cards = Cards;
exports.Comment = Comment
exports.db = db;
