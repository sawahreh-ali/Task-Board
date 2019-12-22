var Note = function(task, deadline) {
    this.task = task;
    this.deadline = deadline;
};
var id = 0;
var addNoteBtn = document.getElementById('addNoteBtn');
function addNote(){
    let task = document.getElementById('task').value;
    let deadline = new Date(document.getElementById('deadline').value).getTime();
    if(deadline > Date.now()){
        var note = new Note(task, deadline);
        var main = document.querySelector('main');
        main.innerHTML += `<div class='notes py-4 px-1' id='note-${id++}'>
                            <p>${task}</p>
                            <span>${new Date(deadline).toLocaleDateString()}</span>
                        <div>`;
    }
    else {
        /* Validate deadline here*/ 
    } 
}