const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        
        if (value === 'C') {
            clear();
        } else if (value === '=') {
            calculate();
        } else if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
        } else {
            appendNumber(value);
        }
    });
});

const clear = () => {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay('0');
};

const appendNumber = (number) => {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput = currentInput.toString() + number.toString();
    updateDisplay(currentInput);
};

const setOperator = (op) => {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
};

const calculate = () => {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result;
    operator = null;
    previousInput = '';
    updateDisplay(result);
};

const updateDisplay = (value) => {
    display.textContent = value;
};
