


class Dictionary{
    constructor(){
        this.submitButton = document.getElementById("submit-button");
        this.addClickEvents();
    }
    addClickEvents(){
        this.submitButton.addEventListener("click", this.storeDefinition);
    }


    // storeDefinition() {
    //     const word = document.getElementById("word").value.trim();
    //     const definition = document.getElementById("definition").value.trim();
    
    //     if (!word || !definition) {
    //         document.getElementById("result").textContent = "Error: Word and definition are required.";
    //         return;
    //     }
    
    //     fetch("https://exo-engine.com/COMP4537/labs/4/api/definitions", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ word, definition })
    //     })
    //     .then(response => response.json())
    //     .then(data => document.getElementById("result").textContent = data.message || data.error)
    //     .catch(err => document.getElementById("result").textContent = "Error connecting to server.");
    // }

    storeDefinition() {
        const word = document.getElementById("word").value.trim();
        const definition = document.getElementById("definition").value.trim();

        if (!word || !definition) {
            document.getElementById("result").textContent = "Error: Word and definition are required.";
            return;
        }

        const xhr = new XMLHttpRequest();
        const url = "https://exo-engine.com/COMP4537/labs/4/api/definitions";
        const params = `word=${encodeURIComponent(word)}&definition=${encodeURIComponent(definition)}`;

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                document.getElementById("result").textContent = response.message || response.error;
            }
        };
        
        xhr.send(params);
    }

}


const dictionary = new Dictionary();

