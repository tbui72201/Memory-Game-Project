/*
 * Create a list that holds all of your cards
 - cards/icons lenght = total 16
 */
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
* Initialize the game (Flipping cards)
*/

function init() {
    for(let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = ` <i class="${icons[i]}"></i>`;
        cardsContainer.appendChild(card);

        // Add Click Event to each Card
        Click(card); 
    }
}

/*
* Click Event
*/

function Click(card) {
    
    //Card Click Event
    card.addEventListener("click", function() {
           
        const currentCard = this;
        const previousCard = openedCards[0];

        //We have an existing OPENEd cards
        if(openedCards.length === 1){
            
        card.classList.add("open", "show", "disable")
        openedCards.push(this);   
        
        //we should compare our 2 opened cards!
        compare(currentCard, previousCard);
        //console.log();
            
        } else {
        //we dont have any opened cards    
            currentCard.classList.add("open", "show", "disable")
            openedCards.push(this);   
        }        

    });

}
/*
* Check if the game is over! (When the game finishes)
*/
function isOver() {
    if(matchedCards.length === icons.length) {
        //Congratulations Popup
        alert("Congratulations");
    }
}

/*
* Compare the 2 cards (What happend when cards match or not match)
*/
function compare(currentCard, previousCard) {
    
    //Check matcher
    if(currentCard.innerHTML === previousCard.innerHTML) {
                        
            //console.log("Matched!");                       
            //Matched
            currentCard.classList.add("match")
            previousCard.classList.add("match")
            
            matchedCards.push(currentCard, previousCard);
            
            openedCards = [];
            
            //Check if the game is over
            isOver();
            
        } else {
            
            //Timer - setTimeout (Wait 500ms then do this)
            setTimeout(function() {
                //console.log("Doesn't match!");            
                currentCard.classList.remove("open", "show", "disable");
                previousCard.classList.remove("open", "show", "disable");
                openedCards = [];
              }, 500);
 
        }
    //Add New Move
    addMove();
}

/*
* Add move (Move counter)
*/
const movesContainer = document.querySelector(".moves");
let moves =0;
movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;
    
    //Set the rating
    rating();
}

/*
* Rating (star rating)
*/
const starsContainer = document.querySelector(".stars");
function rating() {
    switch(moves) {
        case 20:
            starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
        break;
            
        case 25:
            starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;      
        break;
    }
}

/*
* Restart Button
*/
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    
    //Delete All Cards
    cardsContainer.innerHTML = "";
    
    //Call 'init' to create new cards
    init();
    
    //Reset ANY RELATED variables
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
});

/////////// Start the game for the first time!

init();

