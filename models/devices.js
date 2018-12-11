var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const deviceSchema = new Schema({
    token: String,
    year: String,
    timestamp: Number
})

module.exports = mongoose.model("Devices", deviceSchema);