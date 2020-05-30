var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        required: true
    },
    date: { type: Date, default: Date.now },
    note: { type: String, default: "Not set" }
});

module.exports = mongoose.model('Post', PostSchema);