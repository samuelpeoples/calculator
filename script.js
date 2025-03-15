let previousInput;
let currentInput = [];
let runningInput = [];

let previousNum;
let currentNum;
let sum;

let currentOperation;
let previousOperation;
let completedOperation = false;
let operationSymbol;

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
const btnDivide = document
	.querySelector("#divide")
	.addEventListener("click", () => {
		updateOperation("/");
	});

const btn6 = document.querySelector("#btn6");
const btn5 = document.querySelector("#btn5");
const btn4 = document.querySelector("#btn4");
const btnMultiply = document
	.querySelector("#multiply")
	.addEventListener("click", () => {
		updateOperation("*");
	});

const btn3 = document.querySelector("#btn3");
const btn2 = document.querySelector("#btn2");
const btn1 = document.querySelector("#btn1");
const btnSubtract = document
	.querySelector("#subtract")
	.addEventListener("click", () => {
		updateOperation("-");
	});

const btn0 = document.querySelector("#btn0");
const btnDecimal = document.querySelector("#decimal");
const btnEquals = document
	.querySelector("#equals")
	.addEventListener("click", () => {
		operate(currentOperation, previousNum, currentNum);
	});
const btnAdd = document.querySelector("#add").addEventListener("click", () => {
	updateOperation("+");
});
const btnClea = document
	.querySelector("#btnClear")
	.addEventListener("click", clear);

buttonList.forEach((button) => {
	button.addEventListener("click", () => {
		let checkedChar = button.id.charAt(button.id.length - 1);
		//BUTTONS 0 to 9
		if (checkedChar === "." || !isNaN(checkedChar)) {
			updateValues(`${checkedChar}`);
		}
	});
});

function clear() {
	previousNum = undefined;
	currentNum = undefined;
	sum = undefined;
	previousInput;
	runningInput = [];
	currentInput = [];
	currentOperation = undefined;
	screenHistText.textContent = "";
	screenMainText.textContent = "";
	console.clear();
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

function updateOperation(arg) {
	if (currentOperation != undefined) previousOperation = currentOperation;
	switch (arg) {
		case "+":
			currentOperation = add;
            operationSymbol = arg;
			break;
		case "-":
			currentOperation = subtract;
            operationSymbol = arg;
			break;
		case "*":
			currentOperation = multiply;
            operationSymbol = arg;
			break;
		case "/":
			currentOperation = divide;
            operationSymbol = arg;
			break;
	}
	if (previousOperation != undefined && completedOperation != true) operate(previousOperation, previousNum, currentNum);
	updateScreen(arg);
    completedOperation = false;
}

function updateValues(char) {
    if(completedOperation) { 
        clear();
        completedOperation = false;
    }

    if(currentNum != undefined) previousNum = currentNum;
    previousInput = char;
	updateScreen(char);

	//currentInput = [];
}

function operate(operation, arg1, arg2) {
	let num1 = Number(arg1);
	let num2 = Number(arg2);
    
	sum = operation(num1, num2);
    console.log(`${previousNum} ${operationSymbol} ${currentNum} = ${sum}`);
    console.log(sum)
	previousNum = sum;
    console.log(previousNum)
	currentNum = undefined;
    completedOperation = true;
	screenMainText.textContent = sum;
    screenHistText.textContent += ("=" + previousInput);
	return sum;
}

function updateScreen(char) {
	if (isNaN(previousInput) && char != "." && isNaN(char)) return;

	if (char == "+" || char ==  "-" || char ==  "/" || char ==  "*") {
		runningInput.push(char);
		if (runningInput.length != 1) runningInput.push("");
        console.log(previousNum)
	} else {
		if (runningInput[length] != undefined) {
            let newNum = runningInput.pop();
			newNum += char;
			runningInput.push(newNum);
            currentNum = newNum;
		}
        else{
            runningInput.push(char);
            currentNum = char;
        }
	}
    
	previousInput = char;
    screenHistText.textContent += previousInput;
    screenMainText.textContent += char;
	console.log(`Previous ${previousNum}`);
	console.log(`Current ${currentNum}`);
}
