let btn=document.querySelector('.btn');
btn.addEventListener('click',getStudents);

let form=document.forms[0];
let date=document.getElementById('date');

async function getStudents(){
    const response=axios.get('http:localhost:3000/date');
    if(response.length==0){
        form.style.display='block';
    }
}