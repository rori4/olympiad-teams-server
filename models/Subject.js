const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {type: mongoose.Schema.Types.String, required: true},
    currentInstructor: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    previousInstructors: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;