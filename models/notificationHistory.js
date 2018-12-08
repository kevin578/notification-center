var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const notificationSchema = new Schema({
    title: String,
    message: String,
    link: String,
    years: Array,
    date: String
})

module.exports = mongoose.model("Notifications", notificationSchema);