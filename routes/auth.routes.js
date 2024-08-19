const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).json({ msg: "User does not exist" });

    try {
        bcrypt.compare(password, user.password, async (err, result) => {
            if (err || !result) {
                return res.status(401).json({ msg: "Invalid credentials" });
            } else {
                jwt.sign({ userID: user._id }, process.env.APP_SECRET, (err, token) => {
                    if (err) {
                        return res.status(500).json({ err: "Error generating token" });
                    } else {
                        return res.json({ msg: "Logged in successfully", user, token });
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const existUser = await userModel.findOne({ email });
    if (existUser) {
        return res.status(409).json({ msg: "Email already exists." });
    }

    try {
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({ error: "Error hashing password" });
            } else {
                const user = new userModel({ username, email, password: hash });
                await user.save();
                res.status(201).json({ user, msg: "User created" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

module.exports = router;
