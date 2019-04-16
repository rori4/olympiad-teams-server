const mongoose = require('mongoose');

const olympiadSchema = new mongoose.Schema({
    name: {type: mongoose.Schema.Types.String, required:true},
    subject: {type: mongoose.Schema.Types.ObjectId, required: true },
    date: {type: mongoose.Schema.Types.Date}
});

const Olympiad = mongoose.model('Olympiad', olympiadSchema);
module.exports = Olympiad;