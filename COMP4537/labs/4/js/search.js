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

        const xhr = new XMLHttpRequest();
        const url = `https://exo-engine.com/COMP4537/labs/4/api/definitions/?word=${word}`;
        
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                document.getElementById("searchResult").textContent = response.definition || response.error;
            }
        };
        xhr.send();
    }

}


const dictionary = new Dictionary();