let previousInput = "";
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

const buttonList = document.querySelectorAll("button").forEach((button) => {
	button.addEventListener("click", () => {
		let id = button.id;
		let checkedChar = id.charAt(id.length - 1);

		if (checkedChar === "." || !isNaN(checkedChar)) {
			updateValues(`${checkedChar}`);
		} else if (["add", "subtract", "multiply", "divide"].includes(id)) {
			updateOperation(id);
		} else if (id === "equals") {
			operate(currentOperation, previousNum, currentNum);
		} else {
			clear();
		}
	});
});

function clear() {
	previousInput = "";
    currentInput = [];
	runningInput = [];

    previousNum = null;
	currentNum = null;
	sum = null;

	currentOperation = null;
    previousOperation = null;
    operationSymbol = "";
	screenHistText.textContent = "";
	screenMainText.textContent = "";
	console.clear();
}
const operations = {
    add: (a,b) => a + b,
    subtract:(a,b) => a - b,
    multiply:(a,b) => a * b,
    divide:(a,b) => (a !== 0 && b !== 0 ? a / b: "No")
}

function updateOperation(arg) {
    if ( isNaN(previousInput || previousInput != ".")) return;

	if (currentOperation != null) previousOperation = currentOperation;
	switch (arg) {
		case "add":
			currentOperation = operations[arg];
			operationSymbol = "+";
			break;
		case "subtract":
			currentOperation = operations[arg];
			operationSymbol = "-";
			break;
		case "multiply":
			currentOperation = operations[arg];
			operationSymbol = "*";
			break;
		case "divide":
			currentOperation = operations[arg];
			operationSymbol = "/";
			break;
	}

	if (previousOperation != null && !completedOperation)
		operate(previousOperation, previousNum, currentNum);

    if (currentNum != null) {
        previousNum = currentNum;
        currentNum = null
    }

	updateScreen(operationSymbol);
	completedOperation = false;
}

function updateValues(char) {
	if (char === "." && previousInput.includes(".")) return;

	if (completedOperation) {
		clear();
		completedOperation = false;
	}

	previousInput = char;
	updateScreen(char);
}

function operate(operation, arg1, arg2) {
	sum = operation(Number(arg1), Number(arg2));
	console.log(`${previousNum} ${operationSymbol} ${currentNum} = ${sum}`);
	previousNum = sum;
	currentNum = null;
	completedOperation = true;
	screenMainText.textContent = sum;
	screenHistText.textContent += "=" + sum;
	return sum;
}

function updateScreen(char) {
	if (isNaN(previousInput) && char != "." && isNaN(char)) return;

	if (char === operationSymbol) {
		runningInput.push(char);
		if (runningInput.length != 1) runningInput.push("");
	} else {
		if (runningInput[length] != null) {
            console.log("pop")
			let newNum = (runningInput.pop());
			newNum += char;
			runningInput.push(newNum);
			currentNum = newNum;
		} else {
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
