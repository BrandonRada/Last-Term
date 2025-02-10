class Dictionary{
    constructor(){
        this.searchButton = document.getElementById("search-button");
        this.addClickEvents();
    }
    addClickEvents(){
        this.searchButton.addEventListener("click", this.searchDefinition);
    }

    // searchDefinition() {
    //     const word = document.getElementById("searchWord").value.trim();
    //     if (!word) {
    //         document.getElementById("searchResult").textContent = "Please enter a word to search.";
    //         return;
    //     }

    //     fetch(`https://exo-engine.com/COMP4537/labs/4/api/definitions/?word=${word}`)
    //     .then(response => response.json())
    //     .then(data => document.getElementById("searchResult").textContent = data.definition || data.error)
    //     .catch(err => document.getElementById("searchResult").textContent = "Error connecting to server.");
    // }
    searchDefinition() {
        const word = document.getElementById("searchWord").value.trim();
        if (!word) {
            document.getElementById("searchResult").textContent = "Please enter a word to search.";
            return;
        }

        const xhttp = new XMLHttpRequest();
        const url = `https://exo-engine.com/COMP4537/labs/4/api/definitions/?word=${word}`;
        
        xhttp.open("GET", url, true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                const response = JSON.parse(xhttp.responseText);
                document.getElementById("searchResult").textContent = response.definition || response.error;
            }
        };
        xhttp.send();
    }

}


const dictionary = new Dictionary();