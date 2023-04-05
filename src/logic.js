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
        console.log(calculatorKeys[i].value);
        displayUpdate();
      } else if (calculatorKeys[i].classList.contains("operator")) {
        inputOperator(calculatorKeys[i].value);
        console.log(calculatorKeys[i].value);
      } else if (calculatorKeys[i].classList.contains("decimal")) {
        inputDecimal(calculatorKeys[i].value);
        updateDisplay();
      } else if (calculatorKeys[i].classList.contains("clear")) {
        clear();
        updateDisplay();
      } else if (calculatorKeys[i].classList.contains("equals")) {
        equals();
        updateDisplay();
        console.log(calculatorKeys[i].value);
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
// Renaming Oppo to Operator, Goodnight Oppy reference intended

function inputOperator(nextOperator) {
  // Working backwards, check if it's second, check if it's third, then default to first
  if (operator != null && secondOperator === null) {
    secondOperator = nextOperator;
    console.log("second operator");
    secondNumber = displayValue; //
    results = calculate(Number(firstNumber), operator, Number(secondNumber));
    resultDisplay(results);
    console.log("Results: " + results);
    displayValue = results;
    firstNumber = results;
    results = null;
  } else {
    operator = nextOperator;
    console.log("first operator");
    firstNumber = displayValue;
  }
}

function calculate(first_number, setOperator, second_number) {
  if (setOperator === "+") {
    return first_number + second_number;
  } else if (setOperator === "-") {
    return first_number - second_number;
  } else if (setOperator === "*") {
    return first_number * second_number;
  } else if (setOperator === "/") {
    try {
      return first_number / second_number;
    } catch {
      alert("You can't divide by 0!");
    }
  }
}

/*
const calculatorKeys = document.querySelector(".calc-buttons");
const userInput = document.querySelector(".userInput");
const calculator = document.querySelector(".calculator");
const results = document.querySelector(".result");
let equalsPressed = false;
let equation = 0;
let decimalCheck = "";
let first_number = "";
let second_number = "";
let setOperator = "";
let ontoSecond = false;
let oppo = "";

calculatorKeys.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return;

  const key = event.target;
  const keyValue = key.textContent;
  let displayValue = userInput.textContent;
  const { type } = key.dataset;
  if (type != "backspace") {
    lastKey = keyValue;
    console.log(lastKey);
  }

  if (type === "reset") {
    clear();
  }
  if (type === "backspace") {
    try {
      if (!ontoSecond) {
        first_number.toString();
        first_number = first_number.slice(0, -1);
        first_number = Number(first_number);
        userInput.textContent = first_number;
      } else {
        second_number.toString();
        second_number = second_number.slice(0, -1);
        second_number = Number(second_number);
        userInput.textContent = first_number + " " + oppo + " " + second_number;
      }
    } catch {
      alert("You can only undo one number!");
    }
  }

  if (type === "number" && !equalsPressed && !ontoSecond) {
    userInput.textContent += keyValue;
    first_number += keyValue;
  }
  if (type === "operator" && !equalsPressed && ontoSecond) {
    first_number = Number(first_number);
    second_number = Number(second_number);
    first_answer = calculate(first_number, setOperator, second_number);
    setOperator = key.value;
    oppo = keyValue;
    first_number = first_answer;
    userInput.textContent = first_answer;
    second_number = "";
    ontoSecond = false;
  }
  if (type === "operator" && !equalsPressed && !ontoSecond) {
    oppo = keyValue;
    setOperator = key.value;
    userInput.textContent += " " + keyValue + " ";
    ontoSecond = true;
  }
  if (type === "number" && !equalsPressed && ontoSecond) {
    second_number += keyValue;
    userInput.textContent = first_number + " " + oppo + " " + second_number;
  }

  if (type === "equals") {
    first_number = Number(first_number);
    second_number = Number(second_number);
    results.textContent = calculate(first_number, setOperator, second_number);
  }
});

function calculate(first_number, setOperator, second_number) {
  if (setOperator === "+") {
    return first_number + second_number;
  } else if (setOperator === "-") {
    return first_number - second_number;
  } else if (setOperator === "*") {
    return first_number * second_number;
  } else if (setOperator === "/") {
    try {
      return first_number / second_number;
    } catch {
      alert("You can't divide by 0!");
    }
  }
}

function clear() {
  userInput.textContent = "";
  results.textContent = "";
  first_number = "";
  second_number = "";
  setOperator = "";
  ontoSecond = false;
  oppo = "";
}
*/
