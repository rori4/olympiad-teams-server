const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    olympiad: {type: mongoose.Schema.Types.String, required:true},
    position: {type: mongoose.Schema.Types.Number, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;