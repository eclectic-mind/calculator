class Calculator {
  constructor(memoryArea, newOperand, form) {
    this.memoryArea = memoryArea;
    this.newOperand = newOperand;
    this.form = form;
    this.readyToReset = false;
    this.clearAll();
  }

  clearAll() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.form.reset();
  }

  erase() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  operationToSymbol(op) {
    switch (op) {
      case 'plus':
        return '+';
      case 'minus':
        return '-';
      case 'multiply':
        return '*';
      case 'divide':
        return '/';
      case 'sqrt':
        return '√'
      default:
        return;
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '' && this.previousOperand !== '') {
      this.calculateResult();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  calculateResult() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) && isNaN(current)) return;
    if (isNaN(current) && this.operation === 'sqrt') {
      result = Math.sqrt(prev);
    } else {
      switch (this.operation) {
        case 'plus':
          result = prev + current;
          break;
        case 'minus':
          result = prev - current;
          break;
        case 'multiply':
          result = prev * current;
          break;
        case 'divide':
          result = prev / current;
          break;
        default:
          return;
      }
    }

    this.readyToReset = true;
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay() {
    let op = this.operationToSymbol(this.operation);
    this.memoryArea.innerText = this.operation != null ? `${this.previousOperand} ${op}` : '';
    this.newOperand.innerText = this.currentOperand;
  }
}

const calcForm = document.querySelector('form');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const countButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const eraseButton = document.querySelector('.erase');
const memoryArea = document.querySelector('.previous-operand');
const newOperand = document.querySelector('.current-operand');

const calculator = new Calculator(memoryArea, newOperand, calcForm);

numberButtons.forEach((item) => {
  item.addEventListener('click', () => {
    if (calculator.previousOperand === '' &&
      calculator.currentOperand !== '' &&
      calculator.readyToReset) {
      calculator.currentOperand = '';
      calculator.readyToReset = false;
    }
    calculator.appendNumber(item.value);
    calculator.updateDisplay();
  })
});

operationButtons.forEach((item) => {
  item.addEventListener('click', () => {
    calculator.chooseOperation(item.value);
    calculator.updateDisplay();
  })
});

countButton.addEventListener('click', () => {
  calculator.calculateResult();
  calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
  calculator.clearAll();
  calculator.updateDisplay();
});

eraseButton.addEventListener('click', () => {
  console.log('стёрли цифру');
  calculator.erase();
  calculator.updateDisplay();
});