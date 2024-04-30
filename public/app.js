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

// Setup Operands
let firstOperand = ''
let secondOperand = ''

// Setup Buttons
numberButtons.forEach((button) => {
	button.addEventListener('click', function() {
		appendOperation(button.textContent)
	})
})
clearButton.addEventListener('click', reset)
deleteButton.addEventListener('click', deleteOperand)
decimalButton.addEventListener('click', apppendDecimal)

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

function deleteOperand() {
	currentOperation.textContent = currentOperation.textContent.toString().slice(0, -1)
}

function apppendDecimal() {
	if (currentOperation.textContent.includes('.')) {
		return
	}
	currentOperation.textContent += '.'
}

/** Handles keyboard inputs */
function keyboardInput(event) {
	if (event.key >= 0 && event.key <= 9) {
		appendOperation(event.key)
		return
	}

	switch (event.key) {
		case '.':
			appendOperation(event.key)
			break

		case '=':
		case 'Enter':
			break

		case 'Backspace':
			deleteOperand()
			break

		case '+':
		case '-':
		case '*':
		case '/':
			break

		default:
			break
	}
}