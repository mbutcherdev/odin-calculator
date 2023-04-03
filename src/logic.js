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

  const type = event.target.dataset.type;
  const key = event.target;
  const keyValue = key.textContent;
  console.log(key, keyValue, type);

  if (type === "reset") {
    first_number = "";
    second_number = "";
    setOperator = "";
    ontoSecond = false;
    equalsPressed = false;
    decimalCheck = "";
    userInput.textContent = "";
    results.textContent = "";
  } else if (type === "number" && !equalsPressed && !ontoSecond) {
    first_number += event.target.textContent;
    userInput.textContent = first_number;
  } else if (type === "operator" && !equalsPressed) {
    setOperator = event.target.id;
    oppo = event.target.textContent;
    userInput.textContent = first_number + " " + oppo;
    ontoSecond = true;
  } else if (type === "number" && !equalsPressed && ontoSecond) {
    second_number += event.target.textContent;
    userInput.textContent = first_number + " " + oppo + " " + second_number;
  } else if (type === "equals") {
    // Work out the operator, perform the calculation
    first_number = Number(first_number);
    second_number = Number(second_number);
    equation = calculate(first_number, setOperator, second_number);
    results.textContent = equation;
  }
});

function calculate(first_number, setOperator, second_number) {
  if (setOperator === "add") {
    return first_number + second_number;
  } else if (setOperator === "subtract") {
    return first_number - second_number;
  } else if (setOperator === "multiply") {
    return first_number * second_number;
  } else if (setOperator === "divide") {
    return first_number / second_number;
  }
}
