var Note = function(task, deadline, id) {
    this.task = task;
    this.deadline = deadline;
    this.id = id;
};
var id = 0;
var notes = [];
var addNoteBtn = document.getElementById('addNoteBtn');
function addNote(){
    let task = document.getElementById('task').value;
    let deadlineDate = new Date(document.getElementById('deadlineDate').value).toLocaleDateString();
    let deadlineTime = document.getElementById('deadlineTime').value;
    var dateTime = new Date(`${deadlineDate} ${(deadlineTime ? deadlineTime: '23:59')}`).getTime();
    if( dateTime > Date.now()){
        let note = new Note(task, dateTime, id);
        notes.push(note);
        var main = document.querySelector('main');
        main.innerHTML += ` <div class='notes py-4 px-1' id='note-${id}'>
                                <i class="fas fa-times mr-4" onclick="deleteNote(${id})"></i>
                                <p>${task}</p>
                                <span>${new Date(deadlineDate).toLocaleDateString()}</span> <br />
                                <span>${deadlineTime}</span>
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
