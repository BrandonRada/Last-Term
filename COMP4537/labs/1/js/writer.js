
class Noteboard{
    constructor(){
        this.notes = [];
        this.notesContainer = document.getElementById("notes-container");
        this.addButton = document.getElementById("add-button");
        this.lastsSavedTime = document.getElementById("last-saved-time");
    }
    updateLocalStorage(){
        localStorage.setItem("notes", JSON.stringify(notes));
        this.lastsSavedTime.textContent = `stored at: ${new Date().toLocaleTimeString()}`;
    }
    loadNotes(){
        const savedNotes = JSON.parse(localStorage.getItem("notes"));
        savedNotes.forEach(savedNote => {
            const note = new Note(savedNote.id, savedNote.textContent);
            this.notes.push(note);
            this.notesContainer.appendChild(note.createNoteElement());
        });
    }


}

class Note{
    constructor(id, content = "", noteBoard){
        this.id = id;
        this.textContent = content;
        this.noteBoard = noteBoard;
    }
}

class RemoveButton{
    constructor(id, noteBoard){
        this.id = id;
        this.noteBoard = noteBoard;
        createButtonElement();
    }
    createButtonElement(){
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => this.removeNote());
    }

    removeNote(){
        document.querySelector(`div[data-id='${this.id}']`).remove();
        this.noteBoard.notes = notes.filter(note => note.id !== this.id);
        this.noteBoard.updateLocalStorage();
    }
}