const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

const farindaTasks = [
    "jangan banyak minum kopi",
    "tidur yang cukup",
    "sayang sama mas aja",
    "jangan begadang",
    "senyum dong :)"
]

function addTask() {
    if(inputBox.value === '') {
        alert('Please enter your task!');
    } else if(inputBox.value.toLowerCase() === 'farinda') {
        // Hapus semua list yang ada
        listContainer.innerHTML = '';
        // Tambahkan daftar khusus Farinda
        farindaTasks.forEach(task => {
            let li = document.createElement('li');
            li.innerHTML = task;
            listContainer.appendChild(li);
            let span = document.createElement('span');
            span.innerHTML = '\u00d7';
            li.appendChild(span);
        });
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }

    if(inputBox.value === 'Farinda' || inputBox.value === 'farinda') {
        let li = document.createElement('li');
        li.innerHTML = ''
    }
    inputBox.value = '';
    saveData()
}

listContainer.addEventListener('click', function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
        saveData();
    } 
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();