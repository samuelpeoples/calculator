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

document.addEventListener("keydown", (e) => {
	if (e.key === "." || !isNaN(e.key)) {
		updateValues(`${e.key}`);
	} else if (e.key === "+") {
		updateOperation("add");
	} else if (e.key === "-") {
		updateOperation("subtract");
	} else if (e.key === "*") {
		updateOperation("multiply");
	} else if (e.key === "/") {
		updateOperation("divide");
	} else if (e.key === "=" || e.key === "Enter") {
		operate(currentOperation, previousNum, currentNum);
	} else if (e.key === "Delete") {
		clear();
	} else if (e.key === "Backspace") {
		clear();
	}
});

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
		} else if (id === "btnClear") {
			clear();
		} else if (id === "btnBack") {
			back();
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
	add: (a, b) => a + b,
	subtract: (a, b) => a - b,
	multiply: (a, b) => a * b,
	divide: (a, b) => (a !== 0 && b !== 0 ? a / b : "No"),
};

function updateOperation(arg) {
	if (isNaN(previousInput || previousInput != ".")) return;

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
		currentNum = null;
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
	screenHistText.textContent = sum;
	screenMainText.textContent += "=" + sum;
	return sum;
}

function updateScreen(char) {
	if (isNaN(previousInput) && char != "." && isNaN(char)) return;

	if (char === operationSymbol) {
		runningInput.push(char);
		if (runningInput.length != 1) runningInput.push("");
	} else {
		if (runningInput[length] != null) {
			console.log("pop");
			let newNum = runningInput.pop();
			newNum += char;
			runningInput.push(newNum);
			currentNum = newNum;
		} else {
			runningInput.push(char);
			currentNum = char;
		}
	}

	previousInput = char;
	screenMainText.textContent += previousInput;
	screenHistText.textContent += char;
	console.log(`Previous ${previousNum}`);
	console.log(`Current ${currentNum}`);
}
