const messages = require('../lang/messages/en/user');
class Dictionary{
    constructor(){
        this.searchButton = document.getElementById("search-button");
        this.addClickEvents();
    }
    addClickEvents(){
        this.searchButton.addEventListener("click", this.searchDefinition);
    }
    searchDefinition() {
        const word = document.getElementById("searchWord").value.trim();
        if (!word) {
            document.getElementById("searchResult").textContent = `${messages.missingSearchWord}`;
            return;
        }

        const xhttp = new XMLHttpRequest();
        const url = `https://exo-engine.com/COMP4537/labs/4/api/definitions/?word=${word}`;
        
        xhttp.open("GET", url, true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && (xhttp.status === 200 || xhttp.status === 201)) {
                const response = JSON.parse(xhttp.responseText);
                document.getElementById("searchResult").textContent = `${messages.missingSearchWord.replace("%1",response.word).replace("%2", response.definition)}`;
            }else{
                const response = JSON.parse(xhttp.responseText);
                document.getElementById("searchResult").textContent = `${messages.requestError.replace("%1", response.requestCount).replace("%2", response.message)}`;
            }
        };
        xhttp.send();
    }

}


const dictionary = new Dictionary();