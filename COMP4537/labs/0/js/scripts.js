import { messages } from "../lang/messages/en/user.js";

// A class that handles the game.
class Game{
    constructor(){
        this.currentButtonValue = 1;
        this.numberOfButtons = 0;
        this.WINTEXT = messages.winText;
        this.WRONGORDER = messages.wrongOrder;
        this.buttonManager = new ButtonManager(this);
    }

    // Verify whether the users field entry was valid or not.
    verifyEntry(){
        let numberEntry = document.getElementById("numberEntry");
        let enteredValue = numberEntry.value;
        let allowedValue;
    
        if(enteredValue < 3 || enteredValue > 7){
            alert(messages.invalidRange)
            allowedValue = false;
        }else{
            this.numberOfButtons = enteredValue;
            this.buttonManager.generateButtons(enteredValue);
        }
    }

    // Method used for resseting the game values. Gives the go button its functionality back.
    resetGame() {
        this.currentButtonValue= 1;
        this.numberOfButtons = 0;
        document.getElementById("goBtn").onclick =  () => game.verifyEntry();
    }

    // A method for increasing the value of the next button that must be pressed. If the last button was pressed, the user won!
    nextValue() {
        this.currentButtonValue++;
        // If the user wins, alert them and reset the game.
        if (this.currentButtonValue > this.numberOfButtons) {
            alert(this.WINTEXT);
            this.resetGame();
        }
    }
    // A method for handling buttons pressed in wrong orders, by revealing the numbers, displaying a message, and resetting the game.
    handleWrongOrder() {
        this.buttonManager.revealNumbers();
        alert(this.WRONGORDER);
        this.resetGame();
    }

}

// Class for managing buttons. Holds a list of current buttons, allows for hiding and viewing the numbers. 
class ButtonManager{
    constructor(game){
        this.game = game;
        this.buttons = [];
        this.goBtn = document.getElementById("goBtn");
    }

    // Generate all of the buttons onto the screen in the button area.
    generateButtons(numberOfButtons){
        const buttonArea = document.getElementsByClassName("buttonArea")[0];
        let time = 1000* this.game.numberOfButtons;
        buttonArea.innerHTML = "";

        this.removeButtons();

        for(let i = 1; i <= numberOfButtons; i++){
            const newButton = new MyButton(i, this.game, "5em", "10em", "5px");
            this.buttons.push(newButton);
            let domBTN = newButton.getDOMbutton();

            buttonArea.appendChild(domBTN);
        }
        this.lockGoButton();
        setTimeout(() => this.scrambleButtons(), time);

    }
    // Remove buttons from memory.
    removeButtons(){
        this.buttons = [];
    }

    // Scramble the buttons around the page the required times whith the required timeout.
    async scrambleButtons(){
        for(let i = 1; i <= this.game.numberOfButtons; i++){
            for(let j = 1; j <= this.game.numberOfButtons; j++){
                let top = Math.random()*window.innerHeight;
                let left = Math.random()*window.innerWidth;
                let currentButton = document.getElementById(`button${j}`)

                currentButton.style.position = "absolute";
                currentButton.style.top = `${top}px`;
                currentButton.style.left = `${left}px`;
    
            }
            await sleep(2000);
        }
        this.hideNumbers();
      }

    // Hides the values/numbers displayed on the buttons.
    hideNumbers() {
        this.buttons.forEach(button => button.hideNumber());
    }
    // Shows the values/numbers displayed on the buttons.
    revealNumbers() {
        this.buttons.forEach(button => button.revealNumber());
    }
     // Locks the go button. Used when game is in play.
    lockGoButton(){
        this.goBtn.onclick = "";
    }
}

// A button class that holds information for individual buttons whith specifications for what you want a button to look like.
class MyButton{

    constructor(value, game, height, width, margin){
        this.value = value;
        this.game = game;
        this.height = height;
        this.width = width;
        this.margin = margin;

        this.aButton = document.createElement("Button");
        this.initProperties();
    }
    
    // Initializes a buttons css properties.
    initProperties(){
        this.aButton.id = `button${this.value}`;
        this.aButton.name = this.value;
        this.aButton.textContent = this.value;
        this.aButton.style.height = this.height;
        this.aButton.style.width = this.width;
        this.aButton.style.margin = this.margin;

        this.aButton.style.backgroundColor = this.randomColor();
    }

    // Returns its own (the buttons) DOM element, since a button is an object.
    getDOMbutton(){
        return this.aButton;
    }

    // Click handling for all buttons.
    handleClick(){
        if (this.value === this.game.currentButtonValue) {
            this.revealNumber();
            setTimeout(()=> {
                this.game.nextValue();
            },100);
        } else {
            this.game.handleWrongOrder();
        }
    }

    // Hides the value/number displayed on the given button, and allows it to be clickable and handled.
    hideNumber(){
        this.aButton.textContent = "";
        this.aButton.onclick = () => this.handleClick();
    }
    // Reveals the value/number displayed on the given button, and makes it so it is nto clickable again.
    revealNumber(){
        this.aButton.textContent = this.value;
        this.aButton.onclick = "";
    }

    // Generates a random color. Used when each button is created.
    randomColor(){
        let r = Math.random()*255;
        let g = Math.random()*255;
        let b = Math.random()*255;
        let a = 100;

        return `rgba(${r},${g},${b},${a})`;
    }
}

// Helper function to help with the two second pauses.
// I used some help from chatgpt to make this since the setTimout wasnt working in my scrambling in the way I wanted.
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const game = new Game();
document.getElementById("goBtn").onclick =  () => game.verifyEntry();
