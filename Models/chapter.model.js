const mongoose = require('mongoose');

const chapterSchema = mongoose.Schema({
    chapterName: {
        type: String,
        required: true
    },
    mcqs: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MCQ' }],
        required: true
    }
});

const chapterModel = mongoose.model('Chapter', chapterSchema);
module.exports = chapterModel;