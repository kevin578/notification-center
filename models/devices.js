var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const deviceSchema = new Schema({
    token: String
})

module.exports = mongoose.model("Devices", deviceSchema);