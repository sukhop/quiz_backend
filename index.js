const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const cors = require('cors');

require('dotenv').config()

const connect = require('./DB/db');

const pageModel = require('./Models/page.model');
const userModel = require('./Models/user.model');

const { authMiddleware } = require('./Middleware/auth.middleware');
const app = express();
app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.get('/', authMiddleware, async (req, res) => {
    const { userId } = req.body;
    const user = await userModel.findOne({ _id: userId });
    res.json({ user, userId });
})

app.get('/get-users', async (req, res) => {
    const user = await userModel.find();
    res.json({ user});
})

/*************** Exam APIs *****************/

app.post('/create-exam', authMiddleware, async (req, res) => {
    const { pageName } = req.body;

    const page = new pageModel({ pageName });
    page.save();
    res.json({ page })
})

app.get('/get-exams', authMiddleware, async (req, res) => {
    const exams = await pageModel.find({});
    res.json({exams});
})

app.delete('/delete-exam/:id', authMiddleware, async (req, res) => {
    const {id} = req.params;
    
    const exams = await pageModel.findOne({_id: id});
    await pageModel.findOneAndDelete({_id: id})
    res.json({msg: "Exam deleted", exams});
})
/*************** Exam APIs ends *****************/

/*************** Subject APIs *****************/
// app.patch('/:id/add-subjects', authMiddleware, async(req, res) => {
//     const {id} = req.params;
    
// })
/*************** Subject APIs ends *****************/

/*************** Auth APIs *****************/
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.json({ msg: "User does not exist" });
    }
    
    try {
        bcrypt.compare(password, user.password, async (err, result) => {
            if (err) {
                return res.json({ err: "Incorrect email or password", error: err })
            } else {
                jwt.sign({ userID: user._id }, process.env.APP_SECRET, async (err, token) => {
                    if (err) {
                        return res.json({ err: err })
                    } else {
                        return res.json({ msg: "Logged in successfully", user, token, result })
                    }
                });
            }
        });
    } catch (error) {
        console.log(error)
    }
})
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const existUser = await userModel.findOne({ email });
    if (existUser) {
        return res.json({ err: "Email already exist.", existUser })
    }
    
    try {
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.json({ err })
            } else {
                const user = new userModel({ username, email, password: hash })
                user.save();
                res.json({ user, msg: "User Created" })
            }
        });
    } catch (error) {
        console.log(error)
    }
})
/*************** Auth APIs ends *****************/

app.listen(8080, async (req, res) => {
    try {
        console.log('Server is running on 8080');
        await connect;
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
})