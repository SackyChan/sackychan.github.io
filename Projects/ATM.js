let balance = 1000;//initial balance

let inMenu = 3;

let isWithdraw = 0;

let isDeposit = 0;

let attempts = 3; //number of attempts the user has to enter the correct PIN

function showMenu() {
    document.getElementById("main").innerHTML = "1. Check Balance" + "<br>" +
    "2. Withdraw"+ "<br>" +
    "3. Deposit"+ "<br>" +
    "4. History"+ "<br>" +
    "5. Exit"+ "<br>" + "<br>" +
    "Please choose an option from the above and press enter.";
    inMenu = 1;
}

function inputOne(){
    document.getElementById("values").innerHTML += 1;
}
function inputTwo(){
    document.getElementById("values").innerHTML += 2;
}
function inputThree(){
    document.getElementById("values").innerHTML += 3;
}
function inputFour(){
    document.getElementById("values").innerHTML += 4;
}
function inputFive(){
    document.getElementById("values").innerHTML += 5;
}
function inputSix(){
    document.getElementById("values").innerHTML += 6;
}
function inputSeven(){
    document.getElementById("values").innerHTML += 7;
}
function inputEight(){
    document.getElementById("values").innerHTML += 8;
}
function inputNine(){
    document.getElementById("values").innerHTML += 9;
}
function inputDelete(){
    let trimmed = document.getElementById("values").innerHTML.slice(0, -1);
    document.getElementById("values").innerHTML = trimmed;
}
function inputZero(){
    document.getElementById("values").innerHTML += 0;
}
function inputEnter(){
    if(document.getElementById("values") == null){
        document.getElementById("result").innerHTML = "Please enter a number before pressing enter.";
        showMenu();
    }
    if(inMenu == 1 && document.getElementById("values").innerHTML == 1) {
        document.getElementById("main").innerHTML = "";
        document.getElementById("values").innerHTML = "";
        document.getElementById("result").innerHTML = `Your balance is £${balance}`;
        showMenu();
    }else if (inMenu == 1 && document.getElementById("values").innerHTML == 2){
        document.getElementById("main").innerHTML = "Please enter the amount to withdraw and press enter."
        document.getElementById("values").innerHTML = "";
        document.getElementById("result").innerHTML = "";
        isWithdraw = 1;
        inMenu = 0;
    }else if (inMenu == 1 && document.getElementById("values").innerHTML == 3){
        document.getElementById("main").innerHTML = "Please enter the amount to deposit and press enter."
        document.getElementById("values").innerHTML = "";
        document.getElementById("result").innerHTML = "";
        isDeposit = 1;
        inMenu = 0;
    }else if (inMenu == 1 && document.getElementById("values").innerHTML == 4){
        document.getElementById("values").innerHTML = "";
        document.getElementById("main").innerHTML = "";
        document.getElementById("result").innerHTML = "";
        showHistory();
    }else if (inMenu == 1 && document.getElementById("values").innerHTML == 5){
        document.getElementById("values").innerHTML = "";
        document.getElementById("main").innerHTML = "Please enter your PIN.";
        document.getElementById("result").innerHTML = "";
        attempts = 3;
        inMenu = 3;
    }else if (inMenu == 0 && isWithdraw == 1){
        document.getElementById("main").innerHTML = "";
        if(document.getElementById("values").innerHTML < balance){
            balance -= document.getElementById("values").innerHTML;
            document.getElementById("result").innerHTML = `Your balance is now £${balance}. Press enter to return to menu.`;
            recordTransaction("Withdraw", document.getElementById("values").innerHTML); 
            inMenu = 2;
        }else {
            document.getElementById("result").innerHTML = "Transaction could not be completed. You do not have enough money in your account, please amend the amount and try again";
        }
        document.getElementById("values").innerHTML = "";
        isWithdraw = 0;
    }else if (inMenu == 0 && isDeposit == 1){
        let money = parseFloat(document.getElementById("values").innerHTML);
        balance += money;
        document.getElementById("result").innerHTML = `Your balance is now £${balance}. Press enter to return to menu.`;
        recordTransaction("Deposit", document.getElementById("values").innerHTML);
        isDeposit = 0;
        inMenu = 2;
    }else if (inMenu == 2){
        document.getElementById("result").innerHTML = "";
        document.getElementById("values").innerHTML = "";
        document.getElementById("main").innerHTML = "";
        showMenu();
    }else if (inMenu == 3){
        document.getElementById("main").innerHTML = "";
        checkPIN();
    }else{
        document.getElementById("result").innerHTML = "Please ensure your selection is valid and try again.";
        document.getElementById("values").innerHTML = "";
    }
}

function showHistory(){
    if(transactions.length === 0){
        document.getElementById("result").innerHTML = "No transaction History. Press enter to return to menu.";
    }else{
        document.getElementById("result").innerHTML = `${transactions} <br><br>Press enter to return to menu.`;
    }   
    inMenu = 2;
}

const pin = "1234"; //user's PIN



//function to check the user's PIN
function checkPIN() {
    if(attempts === 0) {
        document.getElementById("main").innerHTML = "You have run out of attempts. Goodbye!";
        return;
    }
    if (document.getElementById("values").innerHTML.trim() == pin) {
        document.getElementById("values").innerHTML = "";
            showMenu();
    } else {
            attempts = attempts - 1;
            document.getElementById("main").innerHTML = `Invalid PIN. ${attempts} attempts remaining.`;
    }
}

//array to store transaction history
let transactions = [];

function recordTransaction(type,amount) {
    transactions.push(`<br>${type}: £${amount}`);
    if (transactions.length > 10) {
        transactions.shift();
    }
}

document.getElementById("1").addEventListener('click',inputOne);
document.getElementById("2").addEventListener('click',inputTwo);
document.getElementById("3").addEventListener('click',inputThree);
document.getElementById("4").addEventListener('click',inputFour);
document.getElementById("5").addEventListener('click',inputFive);
document.getElementById("6").addEventListener('click',inputSix);
document.getElementById("7").addEventListener('click',inputSeven);
document.getElementById("8").addEventListener('click',inputEight);
document.getElementById("9").addEventListener('click',inputNine);
document.getElementById("0").addEventListener('click',inputZero);
document.getElementById("enter").addEventListener('click',inputEnter);
document.getElementById("delete").addEventListener('click',inputDelete);


