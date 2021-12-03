var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    photo:String,
	email: String,
    name: String,
    password: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
});
module.exports = mongoose.model('user', userSchema);