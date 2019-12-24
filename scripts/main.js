var Note = function(task, date, time, id) {
    this.task = task;
    this.date = date;
    this.time = time;
    this.id = id;
};
var id = 0;
var addNoteBtn = document.getElementById('addNoteBtn');
function addNote(){
    let task = document.getElementById('task').value;
    let err = document.getElementById('error');
    if(!task) {
        err.innerText = 'Task is required';
        err.hidden = false;
        return 0;
    }
    else{
        err.innerText = '';
        err.hidden = true;
    }
    let date = new Date(document.getElementById('deadlineDate').value).toLocaleDateString();
    if(date === 'Invalid Date') {
        err.hidden = false;
        err.innerText = 'Date is required';
        return 0;
    } else {
        err.innerText = '';
        err.hidden = true;
    }
    let time = document.getElementById('deadlineTime').value;
    var dateTime = new Date(`${date} ${(time ? time: '23:59')}`).getTime();
    if( dateTime > Date.now()){
        let note = new Note(task, date, time, id);
        // notes.push(note);
        var main = document.querySelector('main');
        main.innerHTML += ` <div class='notes py-4 px-1' id='note-${id}'>
                                <i class="fas fa-times mr-4" onclick="deleteNote(${id})"></i>
                                <p>${task}</p>
                                <span>${date}</span> <br />
                                <span>${time}</span>
                            <div>`;
        localStorage.setItem(id++, JSON.stringify(note));
    }
    else {
        err.hidden = false;
        err.innerText = 'Date should be future value';
    }
}

function deleteNote(id) {
    // alert(id);
    var index = notes.map(note => {return note.id;}).indexOf(id);
    notes.splice(index, 1);
    localStorage.removeItem(id);
    document.getElementById(`note-${id}`).remove();
}

window.onload = function() {
    // The try was added cause unknown error was showing when iterating through localstorage,
    // the error doesn't affect the functionality but I wanted to get rid of it. 
    try {
        if(window.localStorage.length){
            var main = document.querySelector('main');
            for(let key in window.localStorage){
                var note = JSON.parse(this.localStorage[key]);
                if(new Date(`${note.date} ${(note.time ? note.time: '23:59')}`).getTime() > Date.now())
                {
                    main.innerHTML += `<div class='notes py-4 px-1' id='note-${note.id}'>
                                        <i class="fas fa-times mr-4" onclick="deleteNote(${note.id})"></i>
                                        <p>${note.task}</p>
                                        <span>${note.date}</span> <br />
                                        <span>${note.time}</span>
                                    <div>`;
                    id++;
                }
                else {
                    this.localStorage.removeItem(key);
                }
            }
        }
    } 
    catch(e){
        // Do nothing
    }
};