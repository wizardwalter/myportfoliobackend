var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var commentsSchema = new mongoose.Schema({
    text: String,
    user:  { type: Schema.Types.ObjectId, ref: 'user' }
})

module.exports = mongoose.model('comment', commentsSchema);