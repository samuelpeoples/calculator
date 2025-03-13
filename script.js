let historyText = [];
let inputValue = [];
let runningInput = [];
let previousNum;
let currentNum;
let currentSum;
let currentOperation;


const buttonList = document.querySelectorAll("button");

const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const btn4 = document.querySelector("#btn4");
const btn5 = document.querySelector("#btn5");
const btn6 = document.querySelector("#btn6");
const btn7 = document.querySelector("#btn7");
const btn8 = document.querySelector("#btn8");
const btn9 = document.querySelector("#btn9");
const btn0 = document.querySelector("#btn0");
const btnDecimal = document.querySelector("#decimal");

const btnAdd = document.querySelector("#add");
const btnSubtract = document.querySelector("#subtract");
const btnMultiply = document.querySelector("#multiply");
const btnDivide = document.querySelector("#divide");

const btnEquals = document.querySelector("#equals");

const screenMain = document.querySelector("#screen");
const screenMainText = document.createElement("span"); 
screenMain.appendChild(screenMainText);

const screenHist = document.querySelector("#screen-hist");
const screenHistText = document.createElement("span"); 
screenHist.appendChild(screenHistText);

//ALL BUTTONS
buttonList.forEach((button) => {
	button.addEventListener("click", () => {
		let checkedChar = button.id.charAt(button.id.length - 1);

        //BUTTONS 0 to 9
		if (checkedChar === "." || !isNaN(checkedChar)) {
			inputValue.push(checkedChar);
            currentNum = Number(inputValue.join(""));
            console.log(currentNum);
            updateValues(`${checkedChar}`);
		}
	});
});

//btnDecimal.addEventListener('click', () => currentOperation = subtract );

// ADDITION
btnAdd.addEventListener("click", () => {
	currentOperation = add;
	processClick();
    updateValues(`+`);
});

// SUBTRACTION
btnSubtract.addEventListener("click", () => {
	currentOperation = subtract;
	processClick();
    updateValues(`-`);
});
// MULTIPLICATION
btnMultiply.addEventListener("click", () => {
	currentOperation = multiply;
	processClick();
    updateValues(`*`);
});
// DIVISION
btnDivide.addEventListener("click", () => {
	currentOperation = divide;
	processClick();
    updateValues(`/`);
});

// EQUALS
btnEquals.addEventListener("click", () => {
    currentSum = operate(currentOperation, previousNum, currentNum);
    processClick();
    previousNum = undefined;
    historyText = [];
    screenHistText.textContent += screenMainText.textContent;
    screenMainText.textContent = currentSum;
    calculate();
});

//CLEAR
btnClear.addEventListener("click", () => {
    previousNum = undefined;
    currentSum = undefined;
    historyText = [];
    screenHistText.textContent = "";
    screenMainText.textContent = "";
    console.clear();
});

function processClick() {
    if (previousNum != undefined) {
        historyText.unshift(previousNum);
        console.table(historyText);
    }
    if (historyText[0] != undefined) {
        previousNum = currentSum;
    } else {
        previousNum = currentNum;
    }
    inputValue = [];
    console.log(currentSum, inputValue, previousNum);
}

function calculate(){
    //GET ALL ENTERED CHARS THAT ARE CURRENT
    let enteredNums = runningInput.filter((input, index) => index % 2 == 0);
    let enteredOperations = runningInput.filter((input, index) => index % 2 != 0);
    
    console.log(enteredNums);
    console.log(enteredOperations);
    console.log(runningInput);

    for(let i = 0; i < enteredOperations.length; i++){
        operate
    }
    //GET THE VALUES AND THE OPERATIONS

    //FOR EACH SET OF TWO NUMS, OPERATE AND UPDATE THE RUNNING TOTAL
}

function operate(operation, a, b) {
	return operation(a, b);
}

function updateValues(char){
    runningInput.push(char);
    screenMainText.textContent += char;
}

function add(currentTotal, val) {
	return (currentTotal += val);
}

function subtract(currentTotal, val) {
	return (currentTotal -= val);
}

function divide(currentTotal, val) {
	return currentTotal / val;
}

function multiply(currentTotal, val) {
	return currentTotal * val;
}

//console.log(operate(multiply, 4, 2));
