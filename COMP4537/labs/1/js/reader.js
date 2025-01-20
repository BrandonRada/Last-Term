let noteID = localStorage.getItem("noteID") ? parseInt(localStorage.getItem("noteID")) : 0;
let lastSavedTime = localStorage.getItem("lastSavedTime") ? `updated at: ${localStorage.getItem("lastSavedTime")}` : "Not saved";


class NoteBoard{
    constructor(){
        this.notes = [];
        this.notesContainer = document.getElementById("notes-container");
        this.lastUpdatedTimeElement = document.getElementById("last-updated-time");
        
    }

    loadNotes(){
        this.notesContainer.innerHTML = '';
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        savedNotes.forEach(savedNote => {
            const note = new Note(savedNote.id, savedNote.textContent, this);
            this.notes.push(note);
            this.notesContainer.appendChild(note.noteArea);
        });
        this.lastUpdatedTimeElement.textContent = lastSavedTime;
        this.updateTime();
    }
    updateTime(){
        lastSavedTime = localStorage.getItem("lastSavedTime") ? `updated at: ${localStorage.getItem("lastSavedTime")}` : "Not saved";
        this.lastUpdatedTimeElement.textContent = lastSavedTime;
    }

}

class Note{
    constructor(id, content = "", noteBoard){
        this.id = id;
        this.textContent = content;
        this.noteBoard = noteBoard;

        // DOM note
        this.noteArea = document.createElement("div");
        this.noteArea.id = `note-area-${id}`;
        this.noteArea.className = "note-area";
        this.noteTextElement = this.createNoteElement();

        // Add the DOM textarea to the note
        this.noteArea.appendChild(this.noteTextElement);
    }

    createNoteElement() {
        const textarea = document.createElement("textarea");

        textarea.value = this.textContent;
        textarea.id = `text-area-${this.id}`;

        // We dont want the user to resize the note (Im assuming) and it looks like we need a size? and readonly.
        textarea.style.resize = "none";
        textarea.style.width = "240px";
        textarea.style.height = "100px";
        textarea.readOnly = true;

        textarea.addEventListener("input", () => {
            this.updateContent(textarea.value);
            this.noteBoard.updateLocalStorage();
        })
        return textarea;
    }

    updateContent(newContent) {
        this.textContent = newContent;
        this.noteBoard.updateLocalStorage();
    }

}

const noteViewer = new NoteBoard();

window.addEventListener("load", () => {
    noteViewer.loadNotes();
});

// This part was from chat. I wasnt sure of how to have an event listener for specific parts that i wanted like the notes and lastsavedtime for changes.
window.addEventListener("storage", (event) => {
    if (event.key === "notes" || event.key === "lastSavedTime") {
        // When notes or lastSavedTime change, reload the notes and update the display
        noteViewer.loadNotes();
    }
});