// Get Buttons
const numberButtons = document.querySelectorAll('.number-btn')
const operatorButtons = document.querySelectorAll('.operator-btn')
const clearButton = document.querySelector('.clear-btn')
const deleteButton = document.querySelector('.delete-btn')
const decimalButton = document.querySelector('.decimal-btn')
const equalsButton = document.querySelector('.equals-btn')

// Get Display
const display = document.querySelector('.display')
const currentOperation = document.querySelector('.display-current')
const lastOperation = document.querySelector('.display-last')

// Setup Storage Variables for Calculating
let firstOperand = ''
let secondOperand = ''
let currentOperator

// Setup Buttons
numberButtons.forEach((button) => {
	button.addEventListener('click', function() {
		appendOperation(button.textContent)
	})
})
operatorButtons.forEach((button) => {
	button.addEventListener('click', function() {
		setOperator(button.textContent)
	})
})
clearButton.addEventListener('click', reset)
deleteButton.addEventListener('click', deleteOperand)
decimalButton.addEventListener('click', apppendDecimal)
equalsButton.addEventListener('click', evaluate)

window.addEventListener('keydown', keyboardInput)

/** Clear display */
function clearDisplay() {
	currentOperation.textContent = ''
}

/** Reset display screen & stored operands */
function reset() {
	firstOperand = ''
	secondOperand = ''
	currentOperation.textContent = '0'
	lastOperation.textContent = ''
}

/**
 * Add content to current operation
 * @param {string} content
 */
function appendOperation(content) {
	if (currentOperation.textContent === '0') {
		clearDisplay()
	}
	currentOperation.textContent += content
}

/** Delete 1 of current operand */
function deleteOperand() {
	currentOperation.textContent = currentOperation.textContent.toString().slice(0, -1)
}

/** Add a decimal if one doesn't exist */
function apppendDecimal() {
	if (currentOperation.textContent.includes('.')) {
		return
	}
	currentOperation.textContent += '.'
}

/**
 * Set current operator
 * @param {string} operator
 */
function setOperator(operator) {
	if (currentOperator) {
		evaluate()
	}
	firstOperand = currentOperation.textContent
	currentOperation.textContent = ''
	currentOperator = operator
	lastOperation.textContent = `${firstOperand} ${operator}`
}

/** Calculate result of operation and display it */
function evaluate() {
	secondOperand = currentOperation.textContent
	currentOperation.textContent = operate(currentOperator, firstOperand, secondOperand)
	lastOperation.textContent = ''
}

/**
 * Returns result of operation
 * @param {string} operator
 * @param {string} a
 * @param {string} b
 * @returns {number} Result of operation
 */
function operate(operator, a, b) {
	a = Number(a)
	b = Number(b)
	switch (operator) {
		case '+':
			return a + b
		case '-':
			return a - b
		case '*':
			return a * b
		case '/':
			return a / b
	}
}

/** Handles keyboard inputs */
function keyboardInput(event) {
	if (event.key >= 0 && event.key <= 9) {
		appendOperation(event.key)
		return
	}

	switch (event.key) {
		case '.':
			apppendDecimal()
			break

		case '=':
		case 'Enter':
			evaluate()
			break

		case 'Backspace':
			deleteOperand()
			break

		case '+':
		case '-':
		case '*':
		case '/':
			setOperator(event.key)
			break
	}
}
