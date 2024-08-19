const express = require('express');
const pageModel = require('../models/page.model');
const subjectsModel = require('../Models/subject.model');
const router = express.Router();

router.get('/:id/get-subjects', async (req, res) => {
    const { id } = req.params;

    try {
        const exam = await pageModel.findOne({ _id: id }).populate('subjects');

        if (!exam) {
            return res.status(404).json({ msg: 'Exam not found' });
        }

        res.json({ subjects: exam.subjects });
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ error: 'Error fetching subjects', details: error });
    }
});

router.patch('/:id/add-subjects', async (req, res) => {
    const { id } = req.params;
    const subjects = req.body;

    try {
        const subjectPromise = subjects.map(async (subject) => {
            const exist = await subjectsModel.findOne({ subjectName: subject.subjectName });

            if (exist) {
                return exist._id;
            } else {
                const newSub = new subjectsModel(subject);
                await newSub.save();
                return newSub;
            }
        })

        const subjectIDs = await Promise.all(subjectPromise);

        const updateSubject = await pageModel.findOneAndUpdate(
            { _id: id },
            {
                $addToSet: {
                    subjects: { $each: subjectIDs }
                }
            },
            { new: true }
        );

        res.json(updateSubject);

    } catch (error) {
        console.error('Error updating subjects', error)
        res.json({ msg: 'Error updating subjects', err: err })
    }
})

module.exports = router;