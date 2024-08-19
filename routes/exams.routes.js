const express = require('express');
const pageModel = require('../models/page.model');
const router = express.Router();

router.post('/create-exam', async (req, res) => {
    const { pageName } = req.body;

    const page = new pageModel({ pageName });
    await page.save();
    res.status(201).json({ page });
});

router.get('/get-exams', async (req, res) => {
    const exams = await pageModel.find({});
    res.json({ exams });
});

router.delete('/delete-exam/:id', async (req, res) => {
    const { id } = req.params;

    const exams = await pageModel.findOne({ _id: id });
    await pageModel.findOneAndDelete({ _id: id });
    res.json({ msg: "Exam deleted", exams });
});

module.exports = router;
