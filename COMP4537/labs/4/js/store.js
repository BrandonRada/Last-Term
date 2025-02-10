import { messages } from '../lang/messages/en/user';
class Dictionary {
    constructor() {
        this.submitButton = document.getElementById("submit-button");
        this.addClickEvents();
    }

    addClickEvents() {
        this.submitButton.addEventListener("click", () => this.storeDefinition());
    }

    // I got this from ChatGPT as I was not sure how to allow only letters and certain symbols for the word and definition.
    isValidInput(word, definition) {
        const wordRegex = /^[A-Za-z\s-]+$/; // Allows only letters, spaces, and hyphens
        const definitionRegex = /^[A-Za-z\s.,-]+$/; // Allows letters, spaces, periods, commas, and hyphens

        if (!word || !definition) {
            document.getElementById("result").textContent = `${messages.missingWordOrDefinition}`;
            return false;
        }
        if (!wordRegex.test(word)) {
            document.getElementById("result").textContent = `${messages.invalidWord}`;
            return false;
        }
        if (!definitionRegex.test(definition)) {
            document.getElementById("result").textContent = `${messages.invalidDefinition}`;
            return false;
        }
        return true;
    }

    storeDefinition() {
        const word = document.getElementById("word").value.trim();
        const definition = document.getElementById("definition").value.trim();

        if (!this.isValidInput(word, definition)) {
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
                        document.getElementById("result").textContent = `${messages.requestSuccess.replace("%1", response.requestCount).replace("%2", response.message).replace("%3", response.date).replace("%4", response.totalEntries)}`;
                    }
                } catch (err) {
                    console.log("Caught err");
                    document.getElementById("result").textContent = `${messages.unexpectedResponse}`;
                }
            }
        };

        xhttp.send(data);
    }
}

const dictionary = new Dictionary();
