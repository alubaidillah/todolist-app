const inputBox = document.getElementById('input-box');
const timeBox = document.getElementById('time-box');
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
        if (timeBox.value) {
            li.setAttribute('data-time', timeBox.value);
            li.innerHTML += ` <small>(${timeBox.value})</small>`;
            scheduleNotification(inputBox.value, timeBox.value);
        }
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

function scheduleNotification(task, time) {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
    const now = new Date();
    const [hours, minutes] = time.split(':');
    const notifTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
    let timeout = notifTime.getTime() - now.getTime();
    if (timeout < 0) return; // Lewat waktunya

    setTimeout(() => {
        new Notification("Todolist Reminder", { body: `Saatnya: ${task}` });
    }, timeout);
}

