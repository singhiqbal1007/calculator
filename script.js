class Calculator {
  constructor(previousOutputTextElement, currentOutputTextElement) {
    this.previousOutputTextElement = previousOutputTextElement;
    this.currentOutputTextElement = currentOutputTextElement;
  }

  clear() {
    this.currentOutput = "0";
    this.previousOutput = "";
    this.tempOutput = 0.0;
    this.operation = "+"; //default operation to do with 0
  }

  delete() {
    if (this.currentOutput.length === 1) {
      this.currentOutput = "0";
      return;
    }
    this.currentOutput = this.currentOutput.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOutput.includes(".")) return;
    if (this.currentOutput === "0" && number !== ".") this.currentOutput = "";
    this.currentOutput = this.currentOutput.toString() + number;
  }

  chooseOperation(operation) {
    this.compute();
    this.operation = operation;
    this.previousOutput =
      this.previousOutput + " " + this.currentOutput + " " + operation;
    this.currentOutput = "0";
  }

  compute() {
    let temp;
    const a = this.tempOutput;
    const b = parseFloat(this.currentOutput);
    switch (this.operation) {
      case "+":
        this.tempOutput = a + b;
        break;
      case "-":
        this.tempOutput = a - b;
        break;
      case "*":
        this.tempOutput = a * b;
        break;
      case "/":
        this.tempOutput = a / b;
        break;
      case "%":
        this.tempOutput = a % b;
        break;
    }
  }

  showResult() {
    this.compute();
    this.operation = "+"; //reset operation
    this.previousOutput = this.previousOutput + " " + this.currentOutput;
    this.currentOutput = this.tempOutput;
    this.currentOutputTextElement.innerText = "= " + this.currentOutput;
    this.previousOutputTextElement.innerText = this.previousOutput;
    return this.tempOutput;
  }

  updateDisplay() {
    this.currentOutputTextElement.innerText = this.currentOutput;
    this.previousOutputTextElement.innerText = this.previousOutput;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const previousOutputTextElement = document.querySelector(
  "[data-previous-output]"
);
const currentOutputTextElement = document.querySelector(
  "[data-current-output]"
);

const calculator = new Calculator(
  previousOutputTextElement,
  currentOutputTextElement
);
calculator.clear();
calculator.updateDisplay();

numberButtons.forEach(b => {
  b.addEventListener("click", () => {
    calculator.appendNumber(b.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(b => {
  b.addEventListener("click", () => {
    operation = b.innerText;
    switch (operation) {
      case "×":
        {
          operation = "*";
        }
        break;
      case "÷":
        {
          operation = "/";
        }
        break;
    }
    calculator.chooseOperation(operation);
    calculator.updateDisplay();
  });
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalButton.addEventListener("click", () => {
  var temp = calculator.showResult();
  calculator.clear();
  calculator.currentOutput = temp.toString();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

document.body.addEventListener("keydown", event => {
  if (
    event.key === "1" ||
    event.key === "2" ||
    event.key === "3" ||
    event.key === "4" ||
    event.key === "5" ||
    event.key === "6" ||
    event.key === "7" ||
    event.key === "8" ||
    event.key === "9" ||
    event.key === "0" ||
    event.key === "."
  ) {
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  } else if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "/" ||
    event.key === "*" ||
    event.key === "%"
  ) {
    calculator.chooseOperation(event.key);
    calculator.updateDisplay();
  } else if (event.key === "C" || event.key === "c") {
    calculator.clear();
    calculator.updateDisplay();
  } else if (event.keyCode === 13) {
    // for enter
    var temp = calculator.showResult();
    calculator.clear();
    calculator.currentOutput = temp.toString();
  } else if (event.keyCode === 8 || event.keyCode === 46) {
    //for backspace and delete
    calculator.delete();
    calculator.updateDisplay();
  }
});
