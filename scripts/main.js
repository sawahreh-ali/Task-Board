var Note = function(task, date, time, id) {
    this.task = task;
    this.date = date;
    this.time = time;
    this.id = id;
};
var id = 0;
var notes = [];
var addNoteBtn = document.getElementById('addNoteBtn');
function addNote(){
    let task = document.getElementById('task').value;
    let date = new Date(document.getElementById('deadlineDate').value).toLocaleDateString();
    let time = document.getElementById('deadlineTime').value;
    var dateTime = new Date(`${date} ${(time ? time: '23:59')}`).getTime();
    if( dateTime > Date.now()){
        let note = new Note(task, date, time, id);
        notes.push(note);
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
        /* Validate deadline here*/ 
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
    if(window.localStorage.length){
        var main = document.querySelector('main');
        for(let i = 0; i < window.localStorage.length; i++){
            var note = JSON.parse(this.localStorage[i]);
            main.innerHTML += ` <div class='notes py-4 px-1' id='note-${note.id}'>
                                    <i class="fas fa-times mr-4" onclick="deleteNote(${note.id})"></i>
                                    <p>${note.task}</p>
                                    <span>${note.date}</span> <br />
                                    <span>${note.time}</span>
                                <div>`;
        }
    }
};