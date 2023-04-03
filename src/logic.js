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
