const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CLUSTER);
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit with failure
    }
};

module.exports = { connectDB };


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

