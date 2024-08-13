const mongoose = require('mongoose');
const connect = mongoose.connect(process.env.MONGO_CLUSTER);

module.exports = connect;

// const questions = {
//     question: "question 1",
//     choice: [
//         "opt 1",
//         "opt 2",
//         "opt 3",
//         "opt 4"
//     ],
//     type: "MCQs",
//     correctAnswer: "opt 3",
// }