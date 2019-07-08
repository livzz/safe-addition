import "./styles.css";
import { safe, isNumber, liftA2 } from "crocks";
import compose from "crocks/helpers/compose";

document.getElementById("app").innerHTML = `
<h1>Result</h1>
`;

const numberDom1 = document.getElementById("number1");
const numberDom2 = document.getElementById("number2");
const resultDom = document.getElementById("app");

const safeNumber = safe(isNumber);
const add = num1 => num2 => num1 + num2;
const safeAdd = liftA2(add);

const displayResult = result => (resultDom.innerHTML = result);
const getValueFromDom = dom => dom.value;
const toInt = value => parseInt(value, 10);
const safeValueFromDom = compose(
  safeNumber,
  toInt,
  getValueFromDom
);

const calculate = () => {
  let num2 = safeValueFromDom(numberDom2);
  let num1 = safeValueFromDom(numberDom1);
  return safeAdd(num1, num2).option(0);
};

numberDom1.addEventListener(
  "input",
  compose(
    displayResult,
    calculate
  )
);

numberDom2.addEventListener(
  "input",
  compose(
    displayResult,
    calculate
  )
);

// const numberInput = safe(isNumber, 2);
// const resultNumber = numberInput.map(inc);
// const stringInput = safe(isString, "bit");
// const resultString = stringInput.map(upper);

// document.getElementById("app").innerHTML = resultNumber + " " + resultString;
