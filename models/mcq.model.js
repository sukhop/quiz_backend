const mongoose = require('mongoose');

const mcqSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const mcqModel = mongoose.model('MCQ', mcqSchema);
module.exports = mcqModel;