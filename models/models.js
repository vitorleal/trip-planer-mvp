var mongoose     = require("mongoose"),
    schema       = mongoose.Schema,
    db           = mongoose.createConnection("localhost", "test"),
    mongoSession = require("connect-mongo")(express),

// User model
var userSchema = new schema({
    name: String,
    email: String,
    username: String,
    gender: String,
    facebook_id: String,
    hometown: String,
    location: String,
    locale: String,
    birthday: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    last_update: {
        type: Date,
        default: Date.now
    }
}),
User = db.model('User', userSchema);

module.exports =