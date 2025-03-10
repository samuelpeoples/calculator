let historyText = [];
let currentNum = [];
let previousNum;
let currentOperation;
let currentSum;

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
			currentNum.push(checkedChar);
			console.log(currentNum);
		}
	});
});

//btnDecimal.addEventListener('click', () => currentOperation = subtract );

btnAdd.addEventListener("click", () => {
	currentOperation = add;
	if (previousNum != undefined) {	
        historyText.unshift(previousNum); 

    }
	previousNum = currentNum.join("");
	currentNum = [];
    operate(currentOperation, currentNum, previousNum);
	console.log(currentNum, previousNum);
	console.log(historyText);
});
btnSubtract.addEventListener("click", () => {
	currentOperation = subtract;
	previousNum = currentNum.join();
	currentNum = [];
});
btnMultiply.addEventListener("click", () => {
	currentOperation = multiply;
	previousNum = currentNum.join();
	currentNum = [];
});
btnDivide.addEventListener("click", () => {
	currentOperation = divide;
	previousNum = currentNum.join();
	currentNum = [];
});

btnEquals.addEventListener(
	"click",
	operate(currentOperation, currentNum, previousNum)
);

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

console.log(operate(multiply, 4, 2));
