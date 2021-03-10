const game = ()=> {
    let pScore = 0;
    let cScore = 0;

    // Start the game
    const startGame = ()=> {
        const playButton = document.querySelector(".intro button");
        const introScreen = document.querySelector(".intro");
        const match = document.querySelector(".match");

        // WHen the user clicks on the play button:
        playButton.addEventListener("click", function(){
            introScreen.classList.add("fadeOut");   // intro screen will fade out
            match.classList.add("fadeIn");      // match screen will fade in.
        });
    };

    // Play Match

    const playMatch = ()=> {
        const options = document.querySelectorAll(".options button"); // selects all the button elements from options
        
        const playerHand = document.querySelector(".player-hand");
        const compHand = document.querySelector(".computer-hand");

        const hands = document.querySelectorAll(".hands img"); // both hand images

        // For each hand, we will add event listeners that will listen to animation end. This will run everytime the animation ends.
        hands.forEach(hand => {
            hand.addEventListener("animationend", function()
            {
                this.style.animation="";
            });
        }); // Everytime our animation ends, this event listener will run and will remove the animation applied to each hands, so that when we click for our next try, the animation will start from the beginning.

        // Computer Options, which will be randomly generated
        
        const compOptions = ["rock", "paper", "scissors"];

        // We will loop through each options in our options elements. For Each option (option), we will add an event listener so that we can display rock, paper,      scissors according to the options that we select.
        
        options.forEach(option => {
                option.addEventListener("click", function(){
                    // Computer's choice

                    const compNumber = Math.floor(Math.random() * 3); // .random() will generate a random b/n 0 and 1, then we multiply it by 3 and .floor() to generate the lower bound of the number. 2.8 -> 2, 3.5->3

                    const compChoice = compOptions[compNumber]; //This will generate a random element from the compOptions array. eg: compOptions[2] = scissors, compOptions[0] = rock

                    // setTimeout(function, time) is called because we will update the player choice and the comp choice after a certain delay, i.e 2secs or 2000ms. Hence, after the animation of 2 secs, both player image and comp image will be updated.

                    // Animation
                    playerHand.style.animation = "shakePlayer 1.5s ease";
                    compHand.style.animation = "shakeComp 1.5s ease";
                    
                    setTimeout(() => {
                        // Update images
                        // Here, whatever option we pick, the image will be displayed acoording the option we pick from rock, paper and scissors
                        playerHand.src = `./Pics/${this.textContent}.png`;
                        compHand.src = `./Pics/${compChoice}.png`;
                        
                        // We will call compare hands here
                        compareHands(this.textContent, compChoice);
                        // Here, we are calling the player choice and the computer choice to display who won. compareHands function has two arguments playerChoice and compChoice.

                    }, 1500);
                    
                   
                });
        } );
    };

    // Updating scores

    const updateScore = ()=>{
        const playerScore = document.querySelector(".player-score p");
        const compScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        compScore.textContent = cScore;
    };

    // In here, we will be comparing the user's hand with comp's hand

    const compareHands = (playerChoice, compChoice)=> {
        // Update text
        const winner = document.querySelector(".winner");
        // Checking for tie
        if(playerChoice === compChoice)
        {
            winner.textContent = "It is a tie"; //The text content within the winner div will change.
            return;
        }

        // If choice is rock
        if(playerChoice === "rock")
        {
            if(compChoice === "rock")
            {
                winner.textContent = "It is a tie !";
                return;
            } else if(compChoice === "scissors") {
                winner.textContent = "Player wins !";
                pScore++;
                updateScore();
                playerHand.addEventListener("animationend", function()
                {
                    this.style.animation="";
                });
                return;
            } else if(compChoice === "paper") {
                winner.textContent = "Computer wins !";
                cScore++;
                updateScore();
                return;
            } else {
                console.log("Inavlid Input !");
                return;
            }
        }

         // If choice is paper
        if(playerChoice === "paper")
        {
            if(compChoice === "paper")
            {
                winner.textContent = "It is a tie !";
                return;
            } else if(compChoice === "scissors") {
                winner.textContent = "Computer wins !";
                cScore++;
                updateScore();
                playerHand.addEventListener("animationend", function()
                {
                    this.style.animation="";
                });
                return;
            } else if(compChoice === "rock") {
                winner.textContent = "Player wins !";
                pScore++;
                updateScore();
                return;
            } else {
                console.log("Inavlid Input !");
                return;
            }
        }

         // If choice is scissors
        if(playerChoice === "scissors")
        {
            if(compChoice === "scissors")
            {
                winner.textContent = "It is a tie !";
                return;
            } else if(compChoice === "paper") {
                winner.textContent = "Player wins !";
                updateScore();
                pScore++;
                return;
            } else if(compChoice === "rock") {
                winner.textContent = "Computer wins !";
                cScore++;
                updateScore();
                return;
            } else {
                console.log("Inavlid Input !");
                return;
            }
        }
    };

    // call all the inner functions

    startGame();
    playMatch();
};

// call the main function

game();


