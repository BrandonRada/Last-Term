
class Noteboard{
    constructor(){
        this.notes = [];
        this.notesContainer = document.getElementById("notes-container");
        this.addButton = document.getElementById("add-button");
        this.lastSavedTime = document.getElementById("last-saved-time");
        this.noteID = 0;
        this.createAddNoteButton();
    }
    createAddNoteButton(){
        this.addButton.addEventListener("click", () => {
            // const id = Date.now();
            // const newNote = this.createNoteSegment();
            const [newNote, currentNoteText] = this.createNoteSegment();
            

            this.notes.push(newNote);
            
            // this.notesContainer.appendChild(currentNoteText.noteElement);
            this.notesContainer.appendChild(newNote);
            this.updateLocalStorage();
        });
    }

    createNoteSegment(){
        const note = document.createElement("div");
        const currentNoteText = new Note(this.noteID, noteboard);
        const currentRemoveButton = new RemoveButton(this.noteID, noteboard);
        
        note.className = "note";
        note.id = this.noteID;
        
        note.appendChild(currentNoteText.noteElement);
        note.appendChild(currentRemoveButton.buttonElement);


        this.noteID++;
        return [note, currentNoteText];
        // return [note, currentNoteText];
    }
    

    updateLocalStorage(){
        const DOMNotes = this.notes.map(note => ({
            id: note.id,
            textContent: note.textContent
        }));
        localStorage.setItem("notes", JSON.stringify(DOMNotes));
        // localStorage.setItem("notes", JSON.stringify(this.notes));
        this.lastSavedTime.textContent = `stored at: ${new Date().toLocaleTimeString()}`;
    }
    loadNotes(){
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        savedNotes.forEach(savedNote => {
            const note = new Note(savedNote.id, savedNote.textContent, noteboard);
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
        this.noteElement = this.createNoteElement();
        // this.updateContent(this.textContent);
    }

    createNoteElement() {
        const textarea = document.createElement("textarea");
        textarea.value = this.textContent;
        textarea.id = this.id;
        textarea.addEventListener("input", () => this.updateContent(textarea.value));
        return textarea;
    }

    updateContent(newContent) {
        this.textContent = newContent;
        this.noteBoard.updateLocalStorage();
    }

}

class RemoveButton{
    constructor(id, noteBoard){
        this.id = id;
        this.noteBoard = noteBoard;
        this.buttonElement = this.createButtonElement();
    }
    createButtonElement(){
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => this.removeNote());
        return removeButton;
    }

    removeNote(){
        // document.querySelector(`div[data-id='${this.id}']`).remove();
        // this.noteBoard.notes = notes.filter(note => note.id !== this.id);
        // this.noteBoard.updateLocalStorage();

        // Remove the note element from DOM
        const noteElement = document.querySelector(`div[data-id='${this.id}']`);
        if (noteElement) noteElement.remove();

        // Update the notes array
        this.noteBoard.notes = this.noteBoard.notes.filter(note => note.id !== this.id);
        this.noteBoard.updateLocalStorage();

        
    }
}

const noteboard = new Noteboard();

window.addEventListener("load", () => {
    noteboard.loadNotes();
    setInterval(() => noteboard.updateLocalStorage(), 2000);
});