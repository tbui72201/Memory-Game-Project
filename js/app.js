/*
 * Create a list that holds all of your cards
 */

const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

//var res = arr.concat(arr);    
//console.log(res);

const cardsContainer = document.querySelector(".deck");

//Setup the cards and timer when the game starts
let cards = icons;
let openedCards = [];
let matchedCards = [];
let timer = document.querySelector(".timer");

//Setup the Timer 
let second = 0,
    minute = 0;
let interval;
let timerRunning = false;

/*
* Shuffle function from http://stackoverflow.com/a/2450976
* Shuflle cards each new game (When the game begins the cards need to shuffle randomly)
*/

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

function init() {
    
    let shuffledArray = shuffle(cards);
    
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
           
        //Start the Timer!
        startTimer();        
        
        const currentCard = this;
        const previousCard = openedCards[0];

        //We have an existing OPENED cards
        if(openedCards.length === 1){
            
        card.classList.add("open", "show", "disable")
        openedCards.push(this);   
        finalScoreModal();
            
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
            
            
        // //Check if the game is over
            finalScoreModal();
            
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

//Display Timer function
function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        second = 0;
        minute = 0;
        interval = setInterval(function () {
            second++;
            timer.innerHTML = minute + " mins " + second + " secs";
            if (second == 60) {
                minute++;
                second = 0;
            }
        }, 1000);
    }
}

function stopTimer() {
    if (timerRunning) {
        timerRunning = false;
        clearInterval(interval);
    }
}

function finalScoreModal() {
    if (matchedCards.length ===  icons.length) {
        setTimeout(function delayModalPopup() 
        
    {    
       document.getElementById("modal").style.display = "block";
        }, 1000);
        //get results from moves, stars and timer to display in modal
        document.getElementsByClassName("total-moves")[0].innerHTML = moves + 1;
        let starCount = document.getElementsByClassName("fa-star").length;
        document.getElementsByClassName("rating-stars")[0].innerHTML = starCount;
        document.getElementsByClassName("total-time")[0].innerHTML = timer.innerHTML;
        stopTimer();
        
        //close the modal
        let span = document.getElementsByClassName("close")[0];
        
        span.onclick = function () {
        modal.style.display = "none";
        }
    }
}

// When the user clicks close the modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function playGame() {
    resetGame();
    modal.style.display = "none";
};

// Restart Button (Setup to reset all elements)

document.querySelector(".restart").addEventListener("click", resetGame);

function resetGame() {
        
    //Delete All Cards
    cardsContainer.innerHTML = "";
    
    //Call 'init' to create new cards
    init();
    
    //Reset ANY RELATED variables
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
     //reset timer
    stopTimer();
    second = 0;
    minute = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);   starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;

};

// Start the game for the first time!

init();

