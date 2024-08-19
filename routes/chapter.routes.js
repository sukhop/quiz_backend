const express = require('express');
const pageModel = require('../models/page.model');
const chapterModel = require('../Models/chapter.model');
const subjectsModel = require('../Models/subject.model');
const router = express.Router();

router.get('/:id/get-chapters', async (req, res) => {
    const { id } = req.params;

    try {
        const subject = await subjectsModel.findOne({ _id: id }).populate('chapters');

        if (!subject) {
            return res.status(404).json({ msg: 'Exam not found' });
        }

        res.json({ chapters: subject.chapters });
    } catch (error) {
        console.error('Error fetching chapters:', error);
        res.status(500).json({ error: 'Error fetching chapters', details: error });
    }
});

router.patch('/:id/add-chapters', async (req, res) => {
    const { id } = req.params;
    const chapters = req.body;

    try {
        const chapterPromise = chapters.map(async (chapter) => {
            const exist = await chapterModel.findOne({ chapterName: chapter.chapterName });

            if (exist) {
                return exist._id;
            } else {
                const newChap = new chapterModel(chapter);
                await newChap.save();
                return newChap;
            }
        })

        const chapterIDs = await Promise.all(chapterPromise);

        const updatechapter = await subjectsModel.findOneAndUpdate(
            { _id: id },
            {
                $addToSet: {
                    chapters: { $each: chapterIDs }
                }
            },
            { new: true }
        );

        res.json(updatechapter);

    } catch (error) {
        console.error('Error updating chapters', error)
        res.json({ msg: 'Error updating chapters', err: error })
    }
})

module.exports = router;