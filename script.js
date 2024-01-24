let btn = document.querySelector('.btn');
btn.addEventListener('click', getStudents);

let avg = document.getElementById('avg');
avg.addEventListener('click', fetch);

let form = document.forms[0];
let date = document.getElementById('date');
let studentList = document.querySelector('.student-list');

async function getStudents() {
    const response = await axios.get(`http://localhost:3000/${date.value}`);
    studentList.innerHTML = '';

    if (response.data.length === 0) {

        form.style.display = 'block';
        form.addEventListener('submit', onsubmit);
    }

    else {
        response.data.forEach(element => {
            let student = document.createElement('div');
            const name = document.createElement('span');
            name.textContent = document.getElementById(element.studentId).textContent;
            student.classList.add('span')
            student.appendChild(name);
            const symbol = document.createElement('span');
            symbol.innerHTML = element.isPresent ? '&#10004;' : '&#10006;';
            student.appendChild(symbol);
            studentList.appendChild(student);
        });
    }
}

async function onsubmit(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const attendanceData = [];
    let id = 1;


    for (const [name, value] of formData) {
        attendanceData.push({
            studentId: id++,
            value: value,
            name: name


        })
        // Store the attendance data in an object
    }
    await axios.post(`http://localhost:3000/${date.value}`, attendanceData);
    form.submit();
}

async function fetch() {
    const response = await axios.get(`http://localhost:3000/fetch`);
    const totalCount = response.data.totalCount;
    studentList.innerHTML = '';
    response.data.students.forEach(student => {
        const div = document.createElement('div');
        const percentage=(student.count/totalCount)*100;
        div.textContent = `${student.name} ${student.count}/${totalCount} ${percentage}%`;
        studentList.appendChild(div);
    })
}