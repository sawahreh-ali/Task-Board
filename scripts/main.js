var Note = function(task, deadline) {
    this.task = task;
    this.deadline = deadline;
};
var id = 0;
var notes = [];
var addNoteBtn = document.getElementById('addNoteBtn');
function addNote(){
    let task = document.getElementById('task').value;
    let deadlineDate = new Date(document.getElementById('deadlineDate').value).toLocaleDateString();
    let deadlineTime = document.getElementById('deadlineTime').value;
    var dateTime = new Date(`${deadlineDate} ${(deadlineTime ? deadlineTime: '11:59')}`).getTime();
    if( dateTime > Date.now()){
        notes.push(new Note(task, dateTime));
        var main = document.querySelector('main');
        main.innerHTML += `<div class='notes py-4 px-1' id='note-${id++}'>
                            <p>${task}</p>
                            <span>${new Date(deadlineDate).toLocaleDateString()}</span> <br />
                            <span>${deadlineTime}</span>
                        <div>`;
    }
    else {
        /* Validate deadline here*/ 
    } 
    console.log(notes);
}