// select dice to keep
let safeDice = [0, 0, 0, 0, 0];
//set a counter for rerolls
let rollCount = 0;

//keep track of score being saved, this is used to prevent endless rolling without resetting game state every time roll is pressed
let saved = 0;

//used to make sure the dice have been rolled when trying to save
let rolled = 0;

//number of rounds played
let hands = 0;

//value for player and opponent totals
let total = 0
let opTotal = 0

let dice = [];
// select the dice elements
const diceA = document.getElementById('dice1');
const diceB = document.getElementById('dice2');
const diceC = document.getElementById('dice3');
const diceD = document.getElementById('dice4');
const diceE = document.getElementById('dice5');

// function to roll a dice
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}
// function to roll 5 dice and return the result
function fullRoll() {
    return [rollDice(), rollDice(), rollDice(), rollDice(), rollDice()];
}

// roll the dice
function playGame() {
    if (saved == 0) {
        dice = fullRoll();
        //resets the saved dice so the user can generate new ones, this is also needed to allow specific dice to be rerolled
        safeDice = [0, 0, 0, 0, 0];
        //write score to dice elements on page
        diceA.innerHTML = `${dice[0]}`;
        diceB.innerHTML = `${dice[1]}`;
        diceC.innerHTML = `${dice[2]}`;
        diceD.innerHTML = `${dice[3]}`;
        diceE.innerHTML = `${dice[4]}`;
        //resets reroll limit as new round has begun
        rollCount = 0;
        //prevents user from resetting the roll until a score has been banked
        saved = 1;
        //notes dice have been rolled for the round
        rolled = 1;
        document.getElementById('save').style.display = 'inline-flex';
    }
}

//functions to reroll each dice
function rerollFirst() {
        dice[0] = rollDice();
        diceA.innerHTML = `${dice[0]}`;
}
function rerollSecond() {
    dice[1] = rollDice();
    diceB.innerHTML = `${dice[1]}`;
}
function rerollThird() {
    dice[2] = rollDice();
    diceC.innerHTML = `${dice[2]}`;
}
function rerollFourth() {
    dice[3] = rollDice();
    diceD.innerHTML = `${dice[3]}`;
}
function rerollFifth() {
    dice[4] = rollDice();
    diceE.innerHTML = `${dice[4]}`;
}
// calls each reroll function depending on the game state
function reroll() {
    //limits rerolls to 3 per round
    if (rollCount < 3) {
        if (safeDice[0] === 0) {
            rerollFirst();
        }
        if (safeDice[1] === 0) {
            rerollSecond();
        }
        if (safeDice[2] === 0) {
            rerollThird();
        }
        if (safeDice[3] === 0) {
            rerollFourth();
        }
        if (safeDice[4] === 0) {
            rerollFifth();
        }
        rollCount++;
    }
}

function bankScore() {
        //shows score categories if all dice have been selected 
        if (rollCount == 3 || safeDice[0] != 0 && safeDice[1] != 0 && safeDice[2] != 0 && safeDice[3] != 0 && safeDice[4] != 0) {
            document.getElementById('overlay').style.display = 'block';
            //resets dice background to indicate to the user that they are free to roll again
            diceA.style.backgroundColor = 'white';
            diceB.style.backgroundColor = 'white';
            diceC.style.backgroundColor = 'white';
            diceD.style.backgroundColor = 'white';
            diceE.style.backgroundColor = 'white';
            document.getElementById('save').style.display = 'none';
            rolled = 0;
        }
        else {
            alert("You need to have selected the Dice you want to keep in order to record a score!");
        }

}

function isYahtzee() {
    let counts = [];
    for (let i = 1; i <= 6; i++) {
        counts.push(safeDice.filter(x => x == i).length);
    }
    if (counts.includes(5)) {
        document.getElementById('yahtzee').innerHTML = 50;
        total += 50;
    } else {
        document.getElementById('yahtzee').innerHTML = 0;
    }
    if (Math.floor(Math.random() * 10) + 1 <= 2) {
        document.getElementById('opYahtzee').innerHTML = 50;
        opTotal += 50;
    } else {
        document.getElementById('opYahtzee').innerHTML = 0;
    }
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('yahtzeeSave').style.display = 'none';
    saved = 0;
    hands++;
    findWinner();
}

//checks if dice constitue a full house and adds score accordingly
function isFullHouse() {
    let counts = [];
    for (let i = 1; i <= 6; i++) {
        counts.push(safeDice.filter(x => x == i).length);
    }
    // Check if there is exactly one count of 3 and one count of 2
    if (counts.includes(3) && counts.includes(2)) {
        document.getElementById('fullHouse').innerHTML = 25;
        total += 25;
    } else if (counts.includes(5)) {
        document.getElementById('fullHouse').innerHTML = 50;
        total += 50;
    } else {
        document.getElementById('fullHouse').innerHTML = 0;
    }
    if (Math.floor(Math.random() * 10) + 1 <= 3) {
        document.getElementById('opFullHouse').innerHTML = 25;
        opTotal += 25
    } else {
        document.getElementById('opFullHouse').innerHTML = 0;
    }
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('fullHouseSave').style.display = 'none';
    document.getElementById('total').innerHTML = total;
    document.getElementById('opTotal').innerHTML = opTotal;
    saved = 0;
    hands++;
    findWinner();
}
//function to check if a small straight has been made and add score
function isSmallStraight() {
    let counts = [];
    for (let i = 1; i <= 6; i++) {
        counts.push(safeDice.filter(x => x == i).length);
    }
    if ((safeDice.includes(3) && safeDice.includes(4)) && (safeDice.includes(2) && safeDice.includes(5)) || (safeDice.includes(1) && safeDice.includes(2)) || (safeDice.includes(5) && safeDice.includes(6))) {
        document.getElementById('smallStraight').innerHTML = 30;
        total += 30;
    } else if (counts.includes(5)) {
        document.getElementById('smallStraight').innerHTML = 50;
        total += 50;
    } else {
        document.getElementById('smallStraight').innerHTML = 0;
    }
    if (Math.floor(Math.random() * 10) + 1 <= 6) {
        document.getElementById('opSmallStraight').innerHTML = 30;
        opTotal += 25
    } else {
        document.getElementById('opSmallStraight').innerHTML = 0;
    }
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('smallStraightSave').style.display = 'none';
    saved = 0;
    hands++;
    document.getElementById('total').innerHTML = total;
    document.getElementById('opTotal').innerHTML = opTotal;
    findWinner();
}

//function to check if a large straight has been made and add score
function isLargeStraight() {
    let counts = [];
    for (let i = 1; i <= 6; i++) {
        counts.push(safeDice.filter(x => x == i).length);
    }
    if ((safeDice.includes(2) && safeDice.includes(3) && safeDice.includes(4) && safeDice.includes(5)) &&
        (safeDice.includes(1) || safeDice.includes(6))) {
        document.getElementById('largeStraight').innerHTML = 40;
        total += 40;
    } else if (counts.includes(5)) {
        document.getElementById('largeStraight').innerHTML = 50;
        total += 50;
    } else {
        document.getElementById('largeStraight').innerHTML = 0;
    }
    if (Math.floor(Math.random() * 10) + 1 <= 4) {
        document.getElementById('opLargeStraight').innerHTML = 40;
        opTotal += 40
    } else {
        document.getElementById('opLargeStraight').innerHTML = 0;
    }
    document.getElementById('largeStraightSave').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('total').innerHTML = total;
    document.getElementById('opTotal').innerHTML = opTotal;
    saved = 0;
    hands++;
    findWinner();
}

function isFourKind() {
    let counts = [];
    for (let i = 1; i <= 6; i++) {
        counts.push(safeDice.filter(x => x == i).length);
    }
    let opSum = (Math.floor(Math.random() * 6) + 1) * 4
    const sum = safeDice.reduce((partialSum, a) => partialSum + a, 0)
    if (counts.includes(4)) {
        document.getElementById('fourOfAKind').innerHTML = sum;
        total += sum;
    } else {
        document.getElementById('fourOfAKind').innerHTML = 0;
    }
    if (Math.floor(Math.random() * 10) + 1 <= 5) {
        document.getElementById('opFourOfAKind').innerHTML = opSum + (Math.floor(Math.random() * 6) + 1);
        opTotal += opSum + (Math.floor(Math.random() * 6) + 1);
    } else {
        document.getElementById('opFourOfAKind').innerHTML = 0;
    }
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('fourOfAKindSave').style.display = 'none';
    document.getElementById('total').innerHTML = total;
    document.getElementById('opTotal').innerHTML = opTotal;
    saved = 0;
    hands++;
    findWinner();
}

function isThreeKind() {
    let counts = [];
    for (let i = 1; i <= 6; i++) {
        counts.push(safeDice.filter(x => x == i).length);
    }
    let opSum = (Math.floor(Math.random() * 6) + 1) * 3;
    const sum = safeDice.reduce((partialSum, a) => partialSum + a, 0);
    if (counts.includes(3)) {
        document.getElementById('threeOfAKind').innerHTML = sum;
        total += sum;
    } else {
        document.getElementById('threeOfAKind').innerHTML = 0;
    }
    if (Math.floor(Math.random() * 10) + 1 <= 8) {
        document.getElementById('opThreeOfAKind').innerHTML = opSum + ((Math.floor(Math.random() * 6) + 1) * 2);
        opTotal += opSum + ((Math.floor(Math.random() * 6) + 1) * 2);
    } else {
        document.getElementById('opThreeOfAKind').innerHTML = 0;
    }
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('threeOfAKindSave').style.display = 'none';
    document.getElementById('total').innerHTML = total;
    document.getElementById('opTotal').innerHTML = opTotal;
    saved = 0;
    hands++;
    findWinner();
}

function isTwoPair() {
    let counts = [];
    for (let i = 1; i <= 6; i++) {
        counts.push(safeDice.filter(x => x == i).length);
    }
    let opPair = (Math.floor(Math.random() * 6) + 1) * 2;
    let opPairSec = (Math.floor(Math.random() * 6) + 1) * 2;
    const sum = safeDice.reduce((partialSum, a) => partialSum + a, 0);
    if (counts.filter(count => count == 2).length == 2) {
        document.getElementById('twoPair').innerHTML = sum;
        total += sum;
    } else {
        document.getElementById('twoPair').innerHTML = 0;
    }
    if (Math.floor(Math.random() * 10) + 1 <= 9) {
        document.getElementById('opTwoPair').innerHTML = opPair + opPairSec + (Math.floor(Math.random() * 6) + 1);
        opTotal += opPair + opPairSec + (Math.floor(Math.random() * 6) + 1);
    } else {
        document.getElementById('opTwoPair').innerHTML = 0;
    }
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('twoPairSave').style.display = 'none';
    document.getElementById('total').innerHTML = total;
    document.getElementById('opTotal').innerHTML = opTotal;
    saved = 0;
    hands++;
    findWinner();
}

function isPair() {
    let counts = [];
    for (let i = 1; i <= 6; i++) {
        counts.push(safeDice.filter(x => x == i).length);
    }
    let opSum = (Math.floor(Math.random() * 6) + 1) * 2;
    const sum = safeDice.reduce((partialSum, a) => partialSum + a, 0);
    if (counts.includes(2)) {
        document.getElementById('onePair').innerHTML = sum;
        total += sum;
    } else {
        document.getElementById('onePair').innerHTML = 0;
    }
    if (Math.floor(Math.random() * 100) + 1 <= 99) {
        document.getElementById('opOnePair').innerHTML = opSum + ((Math.floor(Math.random() * 6) + 1) * 3);
        opTotal += opSum + ((Math.floor(Math.random() * 6) + 1) * 3);
    } else {
        document.getElementById('opOnePair').innerHTML = 0;
    }
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('onePairSave').style.display = 'none';
    document.getElementById('total').innerHTML = total;
    document.getElementById('opTotal').innerHTML = opTotal;
    saved = 0;
    hands++;
    findWinner();
}

function sixes() {
    let counts = safeDice.filter(x => x == 6).length;
    let sum = counts * 6;
    if (sum == 30) { sum = 50; }
    document.getElementById('sixes').innerHTML = sum;
    total += sum;
    let opBase = Math.floor(Math.random() * 5) * 6;
    let opSum = opBase + (Math.floor(Math.random() * 6) + 1);
    if (opSum == 30) {
        opSum = 50;
        document.getElementById('opSixes').innerHTML = opSum;
        opTotal += opSum;
    } else {
        document.getElementById('opSixes').innerHTML = opBase;
        opTotal += opBase;
    }
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('sixesSave').style.display = 'none';
    document.getElementById('total').innerHTML = total;
    document.getElementById('opTotal').innerHTML = opTotal;
    saved = 0;
    hands++;
    findWinner();
}

function fives() {
    let counts = safeDice.filter(x => x == 5).length;
    let sum = counts * 5;
    if (sum == 25) { sum = 50; }
    document.getElementById('fives').innerHTML = sum;
    total += sum;
    let opBase = Math.floor(Math.random() * 5) * 5;
    let opSum = opBase + (Math.floor(Math.random() * 6) + 1);
    if (opSum == 25) {
        opSum = 50;
        document.getElementById('opFives').innerHTML = opSum;
        opTotal += opSum;
    } else {
        document.getElementById('opFives').innerHTML = opBase;
        opTotal += opBase;
    }
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('fivesSave').style.display = 'none';
    document.getElementById('total').innerHTML = total;
    document.getElementById('opTotal').innerHTML = opTotal;
    saved = 0;
    hands++;
    findWinner();
}

function fours() {
    let counts = safeDice.filter(x => x == 4).length;
    let sum = counts * 4;
    if (sum == 20) { sum = 50; }
    document.getElementById('fours').innerHTML = sum;
    total += sum;
    let opBase = Math.floor(Math.random() * 5) * 4;
    let opSum = opBase + (Math.floor(Math.random() * 6) + 1);
    if (opSum == 20) {
        opSum = 50;
        document.getElementById('opFours').innerHTML = opSum;
        opTotal += opSum;
    } else {
        document.getElementById('opFours').innerHTML = opBase;
        opTotal += opBase;
    }
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('foursSave').style.display = 'none';
    document.getElementById('total').innerHTML = total;
    document.getElementById('opTotal').innerHTML = opTotal;
    saved = 0;
    hands++;
    findWinner();
}

function threes() {
    let counts = safeDice.filter(x => x == 3).length;
    let sum = counts * 3;
    if (sum == 15) { sum = 50; }
    document.getElementById('threes').innerHTML = sum;
    total += sum;
    let opBase = Math.floor(Math.random() * 5) * 3;
    let opSum = opBase + (Math.floor(Math.random() * 6) + 1);
    if (opSum == 15) {
        opSum = 50;
        document.getElementById('opThrees').innerHTML = opSum;
        opTotal += opSum;
    } else {
        document.getElementById('opThrees').innerHTML = opBase;
        opTotal += opBase;
    }
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('threesSave').style.display = 'none';
    document.getElementById('total').innerHTML = total;
    document.getElementById('opTotal').innerHTML = opTotal;
    saved = 0;
    hands++;
    findWinner();
}

function twos() {
    let counts = safeDice.filter(x => x == 2).length;
    let sum = counts * 2;
    if (sum == 10) { sum = 50; }
    document.getElementById('twos').innerHTML = sum;
    total += sum;
    let opBase = Math.floor(Math.random() * 5) * 2;
    let opSum = opBase + (Math.floor(Math.random() * 6) + 1);
    if (opSum == 10) {
        opSum = 50;
        document.getElementById('opTwos').innerHTML = opSum;
        opTotal += opSum;
    } else {
        document.getElementById('opTwos').innerHTML = opBase;
        opTotal += opBase;
    }
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('twosSave').style.display = 'none';
    document.getElementById('total').innerHTML = total;
    document.getElementById('opTotal').innerHTML = opTotal;
    saved = 0;
    hands++;
    findWinner();
}

function ones() {
    let counts = safeDice.filter(x => x == 1).length;
    if (counts == 5) { counts = 50; }
    document.getElementById('ones').innerHTML = counts;
    total += counts;
    let opBase = Math.floor(Math.random() * 5);
    let opSum = opBase + (Math.floor(Math.random() * 6) + 1);
    if (opSum == 5) {
        opSum = 50;
        document.getElementById('opOnes').innerHTML = opSum;
        opTotal += opSum;
    } else {
        document.getElementById('opOnes').innerHTML = opBase;
        opTotal += opBase;
    }
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('onesSave').style.display = 'none';
    document.getElementById('total').innerHTML = total;
    document.getElementById('opTotal').innerHTML = opTotal;
    saved = 0;
    hands++;
    findWinner();
}

function chance() {
    let sum = safeDice.reduce((partialSum, a) => partialSum + a, 0);
    document.getElementById('chance').innerHTML = sum;
    total += sum;
    let a = Math.floor(Math.random() * 6) + 1;
    let b = Math.floor(Math.random() * 6) + 1;
    let c = Math.floor(Math.random() * 6) + 1;
    let d = Math.floor(Math.random() * 6) + 1;
    let e = Math.floor(Math.random() * 6) + 1;
    let opSum = a+b+c+d+e;
    document.getElementById('opChance').innerHTML = opSum;
    opTotal += opSum;
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('chanceSave').style.display = 'none';
    document.getElementById('total').innerHTML = total;
    document.getElementById('opTotal').innerHTML = opTotal;
    saved = 0;
    hands++;
    findWinner();
}

//function to compare totals once all hands have been played
function findWinner() {
    if (hands == 15) {
        if (document.getElementById('total').innerHTML > document.getElementById('opTotal').innerHTML) {
            alert('You are the winner, Congratulations!!');
        } else if (document.getElementById('total').innerHTML == document.getElementById('opTotal').innerHTML) {
            alert('You and your opponent have tied, click New Game to play again!');
        } else {
            alert('You lose, click New Game to play again!');
        }
    }
}
//function to reset all fields to a default state
function newGame() {
    saved = 0;
    hands = 0;
    rollCount = 0;
    dice = [];
    diceA.innerHTML = 0;
    diceB.innerHTML = 0;
    diceC.innerHTML = 0;
    diceD.innerHTML = 0;
    diceE.innerHTML = 0;
    safeDice = [0, 0, 0, 0, 0]
    diceA.style.backgroundColor = 'white';
    diceB.style.backgroundColor = 'white';
    diceC.style.backgroundColor = 'white';
    diceD.style.backgroundColor = 'white';
    diceE.style.backgroundColor = 'white';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('fullHouse').innerHTML = '_';
    document.getElementById('opFullHouse').innerHTML = '_';
    document.getElementById('fullHouseSave').style.display = 'inline-flex';
    document.getElementById('yahtzee').innerHTML = '_';
    document.getElementById('opYahtzee').innerHTML = '_';
    document.getElementById('yahtzeeSave').style.display = 'inline-flex';
    document.getElementById('smallStraight').innerHTML = '_';
    document.getElementById('opSmallStraight').innerHTML = '_';
    document.getElementById('smallStraightSave').style.display = 'inline-flex';
    document.getElementById('largeStraight').innerHTML = '_';
    document.getElementById('opLargeStraight').innerHTML = '_';
    document.getElementById('largeStraightSave').style.display = 'inline-flex';
    document.getElementById('fourOfAKind').innerHTML = '_';
    document.getElementById('opFourOfAKind').innerHTML = '_';
    document.getElementById('fourOfAKindSave').style.display = 'inline-flex';
    document.getElementById('threeOfAKind').innerHTML = '_';
    document.getElementById('opThreeOfAKind').innerHTML = '_';
    document.getElementById('threeOfAKindSave').style.display = 'inline-flex';
    document.getElementById('twoPair').innerHTML = '_';
    document.getElementById('opTwoPair').innerHTML = '_';
    document.getElementById('twoPairSave').style.display = 'inline-flex';
    document.getElementById('onePair').innerHTML = '_';
    document.getElementById('opOnePair').innerHTML = '_';
    document.getElementById('onePairSave').style.display = 'inline-flex';
    document.getElementById('sixes').innerHTML = '_';
    document.getElementById('opSixes').innerHTML = '_';
    document.getElementById('sixesSave').style.display = 'inline-flex';
    document.getElementById('fives').innerHTML = '_';
    document.getElementById('opFives').innerHTML = '_';
    document.getElementById('fivesSave').style.display = 'inline-flex';
    document.getElementById('fours').innerHTML = '_';
    document.getElementById('opFours').innerHTML = '_';
    document.getElementById('foursSave').style.display = 'inline-flex';
    document.getElementById('threes').innerHTML = '_';
    document.getElementById('opThrees').innerHTML = '_';
    document.getElementById('threesSave').style.display = 'inline-flex';
    document.getElementById('twos').innerHTML = '_';
    document.getElementById('opTwos').innerHTML = '_';
    document.getElementById('twosSave').style.display = 'inline-flex';
    document.getElementById('ones').innerHTML = '_';
    document.getElementById('opOnes').innerHTML = '_';
    document.getElementById('onesSave').style.display = 'inline-flex';
    document.getElementById('chance').innerHTML = '_';
    document.getElementById('opChance').innerHTML = '_';
    document.getElementById('chanceSave').style.display = 'inline-flex';
}

//event listeners for score assignment
document.getElementById('fullHouseSave').addEventListener('click', isFullHouse);
document.getElementById('yahtzeeSave').addEventListener('click', isYahtzee);
document.getElementById('smallStraightSave').addEventListener('click', isSmallStraight);
document.getElementById('largeStraightSave').addEventListener('click', isLargeStraight);
document.getElementById('fourOfAKindSave').addEventListener('click', isFourKind);
document.getElementById('threeOfAKindSave').addEventListener('click', isThreeKind);
document.getElementById('twoPairSave').addEventListener('click', isTwoPair);
document.getElementById('onePairSave').addEventListener('click', isPair);
document.getElementById('sixesSave').addEventListener('click', sixes);
document.getElementById('fivesSave').addEventListener('click', fives);
document.getElementById('foursSave').addEventListener('click', fours);
document.getElementById('threesSave').addEventListener('click', threes);
document.getElementById('twosSave').addEventListener('click', twos);
document.getElementById('onesSave').addEventListener('click', ones);
document.getElementById('chanceSave').addEventListener('click', chance);
//event listeners for primary functionality
document.getElementById('save').addEventListener('click', bankScore);
document.getElementById('reroll').addEventListener('click', reroll);
document.getElementById('roll').addEventListener('click', playGame);
document.getElementById('reset').addEventListener('click', newGame);

//event listers to lock in Dice as safe
diceA.addEventListener('click', function () {
    //checks if dice have been rolled since last save
    if (rolled == 1) {
        if (diceA.innerHTML != 0) {
            safeDice[0] = dice[0];
            diceA.style.backgroundColor = 'lightgreen';
        }
    } else {
        alert("You must roll the dice before attempting to save the score!")
    }
});
diceB.addEventListener('click', function () {
    if (rolled == 1) {
        if (diceB.innerHTML != 0) {
            safeDice[1] = dice[1];
            diceB.style.backgroundColor = 'lightgreen';
        }
    } else {
        alert("You must roll the dice before attempting to save the score!")
    }
});
diceC.addEventListener('click', function () {
    if (rolled == 1) {
        if (diceC.innerHTML != 0) {
            safeDice[2] = dice[2];
            diceC.style.backgroundColor = 'lightgreen';
        }
    } else {
        alert("You must roll the dice before attempting to save the score!")
    }
});
diceD.addEventListener('click', function () {
    if (rolled == 1) {
        if (diceD.innerHTML != 0) {
            safeDice[3] = dice[3];
            diceD.style.backgroundColor = 'lightgreen';
        }
    } else {
        alert("You must roll the dice before attempting to save the score!")
    }
});
diceE.addEventListener('click', function () {
    if (rolled == 1) {
        if (diceE.innerHTML != 0) {
            safeDice[4] = dice[4];
            diceE.style.backgroundColor = 'lightgreen';
        }
    } else {
        alert("You must roll the dice before attempting to save the score!")
    }
});
//resets the safedice value and removes background to deselect the dice
diceA.addEventListener('dblclick', function () {
    safeDice[0] = 0;
    diceA.style.backgroundColor = 'white';
});
diceB.addEventListener('dblclick', function () {
    safeDice[1] = 0;
    diceB.style.backgroundColor = 'white';
});
diceC.addEventListener('dblclick', function () {
    safeDice[2] = 0;
    diceC.style.backgroundColor = 'white';
});
diceD.addEventListener('dblclick', function () {
    safeDice[3] = 0;
    diceD.style.backgroundColor = 'white';
});
diceE.addEventListener('dblclick', function () {
    safeDice[4] = 0;
    diceE.style.backgroundColor = 'white';
});
