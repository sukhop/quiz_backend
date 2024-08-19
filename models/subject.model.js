const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    subjectName: {
        type: String,
        required: true
    },
    chapters: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
    }
});

const subjectsModel = mongoose.model('Subject', subjectSchema);
module.exports = subjectsModel;