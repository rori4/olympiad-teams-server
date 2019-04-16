const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    olympiad: {type: mongoose.Schema.Types.ObjectId, ref: "Olympiad",required:true},
    position: {type: mongoose.Schema.Types.Number, required: true },
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;