


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

        const xhttp = new XMLHttpRequest();
        const url = "https://exo-engine.com/COMP4537/labs/4/api/definitions";
        const params = `word=${encodeURIComponent(word)}&definition=${encodeURIComponent(definition)}`;

        xhttp.open("POST", url, true);
        // xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                const response = JSON.parse(xhttp.responseText);
                document.getElementById("result").textContent = response.message || response.error;
            }
        };
        
        xhttp.send(params);
    }

}


const dictionary = new Dictionary();

