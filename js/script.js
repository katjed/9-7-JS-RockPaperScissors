// New game button
var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

// Player pick buttons
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { 
	playerPick('rock'); 
});
pickPaper.addEventListener('click', function() {
	playerPick('paper'); 
});
pickScissors.addEventListener('click', function() {
	playerPick('scissors'); 
});

// Initial values
var gameState = 'notStarted',  // started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

// Game elements
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        break;
    case 'ended':
        newGameBtn.innerText = 'Play again';
        playerPickElem.innerHTML = 'Player selection';
        computerPickElem.innerHTML = 'Computer selection';
        playerResultElem.innerHTML = 'Player score';
        computerResultElem.innerHTML = 'Computer score';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}

setGameElements();

// New game
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
    player.name = prompt('Please enter your name', 'Player name');

    if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints(); 
  }
}

// Player pick & computer pick
/*
function playerPick(playerPick) {
    console.log(playerPick);
}
var x = Math.random();
Math.floor(Math.random()*3); 
*/

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

/* 
function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
} 
*/

// Round winner
function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'none';  
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
        setGamePoints();
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
        setGamePoints();
    }
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

// Game points 
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;

	checkGameWinner();
}

// Game winner
function checkGameWinner() {
	if (player.score === 10 ) {
		alert('Congratulations! You won.');
		gameState = 'ended';
		setGameElements();
	} else if (computer.score === 10) {
		alert('Game over! You lost.');
		gameState = 'ended';
		setGameElements();
	}
}