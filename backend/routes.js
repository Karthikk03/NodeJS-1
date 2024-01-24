const Attendance = require('./models/Attendance');
const Student = require('./models/Student');
const Scount = require('./models/Scount');

const express = require('express');
const router = express.Router();

router.get('/fetch', async (req, res, next) => {
    try {
        const students = await Student.findAll();
        const scount = await Scount.findByPk(1);
        const responseData = {
            students: students,
            totalCount: scount.totalCount
        }
        return res.json(responseData);

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.get('/:date', async (req, res, next) => {
    try {
        const date = req.params.date;
        console.log(date)
        const attendance = await Attendance.findAll({
            where: {
                date: date
            }
        })

        return res.json(attendance);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/:date', async (req, res, next) => {
    try {
        const date = req.params.date;
        const studentData = req.body;
        
        for (const { studentId, value } of studentData) {
            const isPresent = value === 'present';
            await Attendance.create({ date, studentId, isPresent });

            if (isPresent) {
                await Student.increment('count', {
                    by: 1,
                    where: { id: studentId }
                })
            }
        }
        const scount = await Scount.findByPk(1);
        if (!scount) {
            await Scount.create({ totalCount: 1 });
        }
        else {
            await Scount.increment('totalCount', {
                by: 1,
                where: { id: 1 }
            })
        }

        res.status(201).json({ message: 'Attendance records created successfully.' });
}
    catch (e) {
    console.log(e);
}
})

module.exports = router