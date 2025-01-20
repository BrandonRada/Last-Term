// Global variables to be used throughout the code.
let noteID = localStorage.getItem("noteID") ? parseInt(localStorage.getItem("noteID")) : 0;
let lastSavedTime = localStorage.getItem("lastSavedTime") ? `stored at: ${localStorage.getItem("lastSavedTime")}` : "Not saved";

// Noteboard Is what holds and manages the notes.
class Noteboard{
    constructor(){
        this.notes = [];
        this.notesContainer = document.getElementById("notes-container");
        this.addButton = document.getElementById("add-button");
        this.lastSavedTimeElement = document.getElementById("last-saved-time");
        
        this.createAddNoteButton();
    }
    // Creates the add note button and its functionality.
    createAddNoteButton(){
        this.addButton.addEventListener("click", () => {
            noteID++;
            // Create a new note object.
            const newNote = new Note(noteID, "", this);
            // Add the note object to the list of notes.
            this.notes.push(newNote);
            // Add the DOM note to the ntoe area.
            this.notesContainer.appendChild(newNote.noteArea);


            
            localStorage.setItem("noteID", noteID);
            localStorage.setItem("lastSavedTime", new Date().toLocaleTimeString())
            this.updateTime();

            this.updateLocalStorage();
        });
    }

    // Updates the local storage with the notes created.
    updateLocalStorage(){
        const DOMNotes = this.notes.map(note => ({
            id: note.id,
            textContent: note.textContent
        }));
        localStorage.setItem("notes", JSON.stringify(DOMNotes));
    }

    // Loads the notes to the writer page. 
    loadNotes(){
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        savedNotes.forEach(savedNote => {
            const note = new Note(savedNote.id, savedNote.textContent, this);
            this.notes.push(note);
            this.notesContainer.appendChild(note.noteArea);
        });
        this.lastSavedTimeElement.textContent = lastSavedTime;
    }

    // Updates the time in local storage and on the screen.
    updateTime(){
        lastSavedTime = localStorage.getItem("lastSavedTime") ? `stored at: ${localStorage.getItem("lastSavedTime")}` : "Not saved";
        this.lastSavedTimeElement.textContent = lastSavedTime;
    }

}

// Note is a textarea and a remove button combined.
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
        // Remove button object
        this.removeButton = new RemoveButton(id, this.noteBoard);

        // Add the DOM textarea to the note
        this.noteArea.appendChild(this.noteTextElement);
        // Add the buttons DOM to the note
        this.noteArea.appendChild(this.removeButton.buttonElement);
    }

    // Creates a DOM element for the textarea and adds an event listener for when the user types.
    createNoteElement() {
        const textarea = document.createElement("textarea");

        textarea.value = this.textContent;
        textarea.id = `text-area-${this.id}`;

        // We dont want the user to resize the note (Im assuming) and it looks like we need a size?
        textarea.style.resize = "none";
        textarea.style.width = "240px";
        textarea.style.height = "100px";

        
        textarea.addEventListener("input", () => {
            this.updateContent(textarea.value);
            this.noteBoard.updateLocalStorage();

            // Update the time when user types in a note.
            localStorage.setItem("lastSavedTime", new Date().toLocaleTimeString());
            this.noteBoard.updateTime(); // Update the displayed time
        })
        return textarea;
    }

    // Updates the content in the textarea.
    updateContent(newContent) {
        this.textContent = newContent;
        this.noteBoard.updateLocalStorage();
    }

}

// A remove button. This class handles the creation of a button element and removing the Note object from the notes list, local storage, and window.
class RemoveButton{
    constructor(id, noteBoard){
        this.id = id;
        this.noteBoard = noteBoard;
        this.buttonElement = this.createButtonElement();
    }

    // Creation of the button element is handled here, adding a on click event listener.
    createButtonElement(){
        const removeButton = document.createElement("button");
        removeButton.id = `remove-button-${this.id}`;
        removeButton.className = "remove-button";
        removeButton.textContent = "remove";
        removeButton.addEventListener("click", () => this.removeNote());
        return removeButton;
    }

    // Handles the removal of the Note object from the notes list, local storage, and window.
    removeNote(){
        const noteElement = document.getElementById(`note-area-${this.id}`);
        if (noteElement) noteElement.remove();

        // Update the notes array
        this.noteBoard.notes = this.noteBoard.notes.filter(note => note.id !== this.id);
        this.noteBoard.updateLocalStorage();

        // Change the last updated time
        localStorage.setItem("lastSavedTime", new Date().toLocaleTimeString());
        this.noteBoard.updateTime();
    }
}

// Create a notebook.
const noteboard = new Noteboard();

// When the window is loaded, load the notes.
window.addEventListener("load", () => {
    noteboard.loadNotes();
});