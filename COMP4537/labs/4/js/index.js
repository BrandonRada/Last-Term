


class Dictionary{
    constructor(){
        this.submitButton = document.getElementById("submit-button");
        this.searchButton = document.getElementById("search-button");
        this.addClickEvents();
    }
    addClickEvents(){
        this.submitButton.addEventListener("click", this.storeDefinition);
        this.searchButton.addEventListener("click", this.searchDefinition);
    }


    storeDefinition() {
        const word = document.getElementById("word").value.trim();
        const definition = document.getElementById("definition").value.trim();
    
        if (!word || !definition) {
            document.getElementById("result").textContent = "Error: Word and definition are required.";
            return;
        }
    
        fetch("https://yourDomainName2.wyz/api/definitions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ word, definition })
        })
        .then(response => response.json())
        .then(data => document.getElementById("result").textContent = data.message || data.error)
        .catch(err => document.getElementById("result").textContent = "Error connecting to server.");
    }

    searchDefinition() {
        const word = document.getElementById("searchWord").value.trim();
        if (!word) {
            document.getElementById("searchResult").textContent = "Please enter a word to search.";
            return;
        }

        fetch(`https://yourDomainName2.wyz/api/definitions?word=${word}`)
        .then(response => response.json())
        .then(data => document.getElementById("searchResult").textContent = data.definition || data.error)
        .catch(err => document.getElementById("searchResult").textContent = "Error connecting to server.");
    }

}


const dictionary = new Dictionary();

