


class Dictionary{
    constructor(){
        this.submitButton = document.getElementById("submit-button");
        this.addClickEvents();
    }
    addClickEvents(){
        this.submitButton.addEventListener("click", this.storeDefinition);
    }

    storeDefinition() {
        const word = document.getElementById("word").value.trim();
        const definition = document.getElementById("definition").value.trim();
    
        if (!word || !definition) {
            document.getElementById("result").textContent = "Error: Word and definition are required.";
            return;
        }
    
        const xhttp = new XMLHttpRequest();
        const url = "https://exo-engine.com/COMP4537/labs/4/api/definitions";
        const data = JSON.stringify({ word, definition });
    
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
    
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4) {
                try {
                    const response = JSON.parse(xhttp.responseText);
                    if (xhttp.status === 400 || xhttp.status === 409) {
                        document.getElementById("result").textContent = response.message;
                    } else {
                        document.getElementById("result").textContent = `${xhttp.status} Request #${response.requestCount} ${response.message} Updated on ${response.date}. ${response.totalEntries} total entries.`;
                    }
                } catch (err) {
                    console.log("Caught err");
                    document.getElementById("result").textContent = "Unexpected server response.";
                }
            }
        };
        
        xhttp.send(data);
    }

}


const dictionary = new Dictionary();

