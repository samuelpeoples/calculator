//let historyText = [];
let currentInput = [];
let runningInput = [];
let previousNum;
let currentNum;
let currentSum;
let currentOperation;

const screenMain = document.querySelector("#screen");
const screenMainText = document.createElement("span"); 
screenMain.appendChild(screenMainText);

const screenHist = document.querySelector("#screen-hist");
const screenHistText = document.createElement("span"); 
screenHist.appendChild(screenHistText);

const buttonList = document.querySelectorAll("button");

const btn7 = document.querySelector("#btn7");
const btn8 = document.querySelector("#btn8");
const btn9 = document.querySelector("#btn9");
const btnDivide = document.querySelector("#divide").addEventListener('click', () => { updateValues("/") });

const btn6 = document.querySelector("#btn6");
const btn5 = document.querySelector("#btn5");
const btn4 = document.querySelector("#btn4");
const btnMultiply = document.querySelector("#multiply").addEventListener('click', () => { updateValues("*") });

const btn3 = document.querySelector("#btn3");
const btn2 = document.querySelector("#btn2");
const btn1 = document.querySelector("#btn1");
const btnSubtract = document.querySelector("#subtract").addEventListener('click',() => { updateValues("-") });

const btn0 = document.querySelector("#btn0");
const btnDecimal = document.querySelector("#decimal");
const btnEquals = document.querySelector("#equals");
const btnAdd = document.querySelector("#add").addEventListener('click', () => { updateValues("+")});

//ALL BUTTONS
buttonList.forEach((button) => {
	button.addEventListener("click", () => {
		let checkedChar = button.id.charAt(button.id.length - 1);

        //BUTTONS 0 to 9
		if (checkedChar === "." || !isNaN(checkedChar)) {
			currentInput.push(checkedChar);
            currentNum = Number(currentInput.join(""));
            updateValues(`${checkedChar}`);
		}
	});
});

// EQUALS
btnEquals.addEventListener("click", () => {
    currentSum = calculate();
    console.log(currentSum)
    previousNum = undefined;
    historyText = [];
    screenHistText.textContent += screenMainText.textContent;
    screenMainText.textContent = currentSum;
});

//CLEAR
btnClear.addEventListener("click", () => {
    previousNum = undefined;
    currentSum = "";
    historyText = [];
    screenHistText.textContent = "";
    screenMainText.textContent = "";
    console.clear();
});

function calculate(){
    //GET ALL ENTERED CHARS THAT ARE CURRENT
    let enteredNums = runningInput.filter((input, index) => index % 2 == 0);
    let enteredOperations = runningInput.filter((input, index) => index % 2 != 0);
    //let sum = 0;
    let arg1;
    let arg2;

    //console.log(enteredNums);
    console.log(enteredOperations);
    //console.log(runningInput);
    //GET THE VALUES AND THE OPERATIONS
    for(let i = 0; i <= enteredOperations.length; i++){
        arg1 = Number(enteredNums[i]);
        arg2 = Number(enteredNums[i+1]);

        switch(enteredOperations[i]){
            case "+": 
                //currentOperation = add;
                return arg1 + arg2;
                break;
            case "-": 
                //currentOperation = subtract;
                return arg1 - arg2;
                break;
            case "*": 
                //currentOperation = multiply;
                return arg1 * arg2;
                break;
            case "/": 
                //currentOperation = divide;
                return arg1 / arg2;
        }
        
        console.log(enteredNums[i]);
        //FOR EACH SET OF TWO NUMS, OPERATE AND UPDATE THE RUNNING TOTAL
        //sum = operate(currentOperation, arg1, arg2);
    }
    //return sum;
}

// function operate(operation, a, b) {
// 	return operation(a, b);
// }

function updateValues(char){

    let enteredOperations = runningInput.filter((input, index) => index % 2 != 0);
    if(enteredOperations.length >= 1){
        console.log("calulate")
        calculate();
    }

    // if (previousNum != undefined) {
    //     historyText.unshift(previousNum);
    //     console.table(historyText);
    // }

    // if (historyText[0] != undefined) {
    //     previousNum = currentSum;
    // } else {
    //     previousNum = currentNum;
    // }
    currentInput = [];



    runningInput.push(char);
    screenMainText.textContent += char;
}

function add(arg1, arg2) {
	return arg1 + arg2;
}

function subtract(arg1, arg2) {
	return arg1 - arg2;
}

function divide(arg1, arg2) {
	return arg1 / arg2;
}

function multiply(arg1, arg2) {
	return arg1 * arg2;
}
