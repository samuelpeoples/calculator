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
		updateOperation(OPERATION.ADD);
	} else if (e.key === "-") {
		updateOperation(OPERATION.SUBTRACT);
	} else if (e.key === "*") {
		updateOperation(OPERATION.MULTIPLY);
	} else if (e.key === "/") {
		updateOperation(OPERATION.DIVIDE);
	} else if (e.key === "=" || e.key === "Enter") {
		operate(currentOperation, previousNum, currentNum);
	} else if (e.key === "Delete") {
		clear();
	} else if (e.key === "Backspace") {
		back();
	}
});

const buttonList = document.querySelectorAll("button").forEach((button) => {
	button.addEventListener("click", () => {
		let value = button.getAttribute("data-value");
		let id = button.id;

		if (value !== null && value !== undefined) {
			updateValues(value);
		} else if ([
			OPERATION.ADD, 
			OPERATION.SUBTRACT, 
			OPERATION.MULTIPLY, 
			OPERATION.DIVIDE
		].includes(id)) {
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
}

function back() {
	if (previousInput.length > 0) {
		if (screenHistText.textContent.endsWith("=" + previousNum)) return;

		previousInput = previousInput.slice(0, -1);
		currentNum = previousInput.length > 0 ? previousInput : currentNum;
		screenMainText.textContent = previousInput;

		screenHistText.textContent = screenHistText.textContent.slice(0, -1);
	}
}

function updateOperation(arg) {
	if (previousInput === "" || previousInput === ".") return;

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

	if (previousOperation != null && !completedOperation) {
		operate(previousOperation, previousNum, currentNum);
	}

	if (currentNum != null) {
		previousNum = currentNum;
		currentNum = null;
		previousInput = "";
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

	previousInput += char;
	currentNum = previousInput;
	updateScreen(char);
}

const OPERATION = {
	ADD: "add",
	SUBTRACT: "subtract",
	MULTIPLY: "multiply",
	DIVIDE: "divide",
};

const operations = {
	add: (a, b) => a + b,
	subtract: (a, b) => a - b,
	multiply: (a, b) => a * b,
	divide: (a, b) => (b !== 0 ? a / b : "No"),
};

function operate(operation, arg1, arg2) {
	sum = operation(Number(arg1), Number(arg2));
	previousNum = sum;
	showResult(sum);
	completedOperation = true;
	return sum;
}

function updateScreen(char) {
	screenMainText.textContent += char;
	screenHistText.textContent += char;
}

function showResult(sum) {
	screenMainText.textContent = sum; // Replace, don't append
	screenHistText.textContent += "=" + sum; // Optionally append to history
}