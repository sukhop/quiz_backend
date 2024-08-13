const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
    pageName: {
        type: String,
        required: true,
    },
    subjects: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
    }
});

const pageModel = mongoose.model('Page', pageSchema);
module.exports = pageModel;