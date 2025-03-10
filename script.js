let historyText = [];
let inputValue = [];
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

buttonList.forEach((button) => {
	button.addEventListener("click", () => {
		let checkedChar = button.id.charAt(button.id.length - 1);
		if (checkedChar === "." || !isNaN(checkedChar)) {
			inputValue.push(checkedChar);
            currentNum = Number(inputValue.join(""));
            console.log(currentNum);
		}
	});
});

//btnDecimal.addEventListener('click', () => currentOperation = subtract );

btnAdd.addEventListener("click", () => {
	currentOperation = add;
	processClick();
});

btnSubtract.addEventListener("click", () => {
	currentOperation = subtract;
	processClick();
});
btnMultiply.addEventListener("click", () => {
	currentOperation = multiply;
	processClick();
});
btnDivide.addEventListener("click", () => {
	currentOperation = divide;
	processClick();
});

btnEquals.addEventListener("click", () => {
	processClick();
    previousNum = undefined;
    historyText = [];
});

btnClear.addEventListener("click", () => {
    previousNum = undefined;
    currentSum = undefined;
    historyText = [];
    console.clear();
});

function processClick() {
    if (previousNum != undefined) {
        historyText.unshift(previousNum);
        console.table(historyText);
        currentSum = operate(currentOperation, previousNum, currentNum);
    }
    
    if (historyText[0] != undefined) {
        previousNum = currentSum;
    } else {
        previousNum = currentNum;
    }
    inputValue = [];
    console.log(currentSum, inputValue, previousNum);
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

function operate(operation, a, b) {
	return operation(a, b);
}

//console.log(operate(multiply, 4, 2));
