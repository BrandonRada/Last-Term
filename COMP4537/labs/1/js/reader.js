// Global variables to be used throughout the code.
let noteID = localStorage.getItem("noteID") ? parseInt(localStorage.getItem("noteID")) : 0;
let lastSavedTime = localStorage.getItem("lastSavedTime") ? `updated at: ${localStorage.getItem("lastSavedTime")}` : "Not saved";

// Noteboard Is what holds and manages the notes.
class NoteBoard{
    constructor(){
        this.notes = [];
        this.notesContainer = document.getElementById("notes-container");
        this.lastUpdatedTimeElement = document.getElementById("last-updated-time");
        
    }

    // Loads the notes to the writer page.
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

    // Updates the time in local storage and on the screen.
    updateTime(){
        lastSavedTime = localStorage.getItem("lastSavedTime") ? `updated at: ${localStorage.getItem("lastSavedTime")}` : "Not saved";
        this.lastUpdatedTimeElement.textContent = lastSavedTime;
    }

}

// Note is a textarea.
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

    // Creates a DOM element for the textarea and adds an event listener for when the user types.
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

    // Updates the content in the textarea.
    updateContent(newContent) {
        this.textContent = newContent;
        this.noteBoard.updateLocalStorage();
    }

}

// Create a notebook/veiwer.
const noteViewer = new NoteBoard();

// When the window is loaded, load the notes.
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