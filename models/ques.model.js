const mongoose = require('mongoose');

const quesSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    choice: [],
    type: {
        type: String,
        requierd: true
    },
    correctAnswer: {
        type: String,
        requierd: true
    },
})

const quesModel = mongoose.model('Questions', quesSchema);
module.exports = quesModel;