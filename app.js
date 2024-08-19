const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./config/db');
const { authMiddleware } = require('./middleware/auth.middleware');

const authRoutes = require('./routes/auth.routes');
const examRoutes = require('./routes/exams.routes');
const subjectRoutes = require('./routes/subject.routes');
const chapterRoutes = require('./routes/chapter.routes');

const app = express();

app.use(cors());
app.use(express.json());

// CORS Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/exams', authMiddleware, examRoutes);
app.use('/subjects', authMiddleware, subjectRoutes);
app.use('/chapters', authMiddleware, chapterRoutes);

module.exports = app;