const sequelize = require('./database');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Student = require('./models/Student');
const Attendance = require('./models/Attendance')


const app = express();

const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());


app.use(routes);

Attendance.belongsTo(Student);
Student.hasMany(Attendance);

(async () => {
    try {
        await sequelize.sync();
        let student = await Student.findByPk(1);
        if (!student) {
            const studentsData = [
                { name: 'karthik', count: 0 },
                { name: 'ravi', count: 0 },
                { name: 'ram', count: 0 },
                { name: 'mouli', count: 0 },
                { name: 'shyam', count: 0 },
            ];
            await Student.bulkCreate(studentsData);
        }
        app.listen(3000);

    }
    catch (e) {
        console.log(e);
    }
})();
