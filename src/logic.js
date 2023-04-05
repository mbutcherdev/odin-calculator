const calculatorKeys = document.querySelectorAll("button");
let displayValue = "0";
let firstNumber = null;
let secondNumber = null;
let operator = null;
let secondOperator = null;
let equalsPressed = false;

// Create a function to update the display
function displayUpdate() {
  const display = document.querySelector(".userInput");
  display.innerText = displayValue;
}
displayUpdate();

// Display the results
function resultDisplay(results) {
  const display = document.querySelector(".result");
  display.innerText = results;
}

// Function to register button clicks
// Using a loop to assign event listeners to each button
function registerButtonEvents() {
  for (let i = 0; i < calculatorKeys.length; i++) {
    calculatorKeys[i].addEventListener("click", function () {
      if (calculatorKeys[i].classList.contains("digit")) {
        inputDigit(calculatorKeys[i].value);
        displayUpdate();
      } else if (calculatorKeys[i].classList.contains("operator")) {
        inputOperator(calculatorKeys[i].value);
      } else if (calculatorKeys[i].classList.contains("decimal")) {
        inputDecimal(calculatorKeys[i].value);
        displayUpdate();
      } else if (calculatorKeys[i].classList.contains("clear")) {
        clear();
        displayUpdate();
      } else if (calculatorKeys[i].classList.contains("equals")) {
        equals();
        displayUpdate();
      } else if (calculatorKeys[i].classList.contains("percent")) {
        percentage(displayValue);
        displayUpdate();
      } else if (calculatorKeys[i].classList.contains("posNeg")) {
        posNeg(displayValue);
        displayUpdate();
      }
    });
  }
}
registerButtonEvents();

// Handle the digit inputs

function inputDigit(digit) {
  if (firstNumber === null) {
    if (displayValue === "0" || displayValue === 0) {
      displayValue = digit;
    } else if (displayValue === firstNumber) {
      displayValue = digit;
    } else {
      displayValue += digit;
    }
  } else {
    if (displayValue === firstNumber) {
      displayValue = digit;
    } else {
      displayValue += digit;
    }
  }
}

// Handle the operator inputs (+, -, *, /)

function inputOperator(nextOperator) {
  // Working backwards, check if it's second, check if it's third, then default to first
  if (operator != null && secondOperator === null) {
    secondOperator = nextOperator;
    secondNumber = displayValue; //
    results = calculate(Number(firstNumber), operator, Number(secondNumber));
    displayValue = results;
    firstNumber = results;
    resultDisplay(results);
    results = null;
  } else if (operator != null && secondOperator != null) {
    secondNumber = displayValue;
    results = calculate(Number(firstNumber), secondOperator, Number(secondNumber));
    secondOperator = nextOperator;
    displayValue = results;
    resultDisplay(results);
    firstNumber = displayValue;
    results = null;
  } else {
    operator = nextOperator;
    firstNumber = displayValue;
  }
}

// Handle equals (=) key getting pressed
function equals() {
  // Check 2 numbers minimum exist. If not, return firstNumber
  if (firstNumber === null) {
    displayValue = firstNumber;
  } else if (secondOperator != null && secondNumber != null) {
    secondNumber = displayValue;
    results = calculate(Number(firstNumber), secondOperator, Number(secondNumber));
    displayValue = results;
    resultDisplay(results);
    firstNumber = results;
    secondNumber = operator = secondOperator = results = null;
  } else {
    secondNumber = displayValue;
    results = calculate(Number(firstNumber), operator, Number(secondNumber));
    resultDisplay(results);
    displayValue = results;
    firstNumber = results;
    secondNumber = operator = secondOperator = results = null;
  }
}

// Handle the clear key getting pressed
function clear() {
  displayValue = "0";
  firstNumber = secondNumber = operator = secondOperator = results = null;
  resultDisplay("");
}

function calculate(first_number, setOperator, second_number) {
  if (setOperator === "+") {
    return first_number + second_number;
  } else if (setOperator === "-") {
    return first_number - second_number;
  } else if (setOperator === "*") {
    return first_number * second_number;
  } else if (setOperator === "/") {
    if (second_number === 0) {
      alert("You can't divide by 0!");
      return 0;
    } else {
      return first_number / second_number;
    }
  }
}

// Handle the decimal key getting pressed
function inputDecimal(dec) {
  if (displayValue === firstNumber || displayValue === secondNumber) {
    displayValue = "0";
    displayValue += dec;
  } else if (!displayValue.includes(dec)) {
    displayValue += dec;
  }
}

// Handle percentage button getting pressed
function percentage(number) {
  if (firstNumber === null) {
    alert("Cannot use percentage on first number");
  } else {
    result = (firstNumber * number) / 100;
    displayValue = result;
    secondNumber = result;
  }
}

// Handle the pos/negative button getting pressed
function posNeg(number) {
  if (number > 0) {
    result = number * -1;
    displayValue = result;
  }
}
