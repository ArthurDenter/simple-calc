function MathString() {
  this.arrMathOperations = [];
  this.mathStringForCalculation = "";
  this.mathStringForOutput = "";
  this.maxNumberOfDigits = 12;
  this.lastCalculatedValue = [0];

  this.setMathStrings = function (digit) {
    let tempDisplayStr = "";
    if (digit === ",") {
      this.mathStringForCalculation += ".";
    } else {
      this.mathStringForCalculation += digit;
    };
    tempDisplayStr = this.mathStringForOutput + digit;
    this.mathStringForOutput = tSeparator(tempDisplayStr);
  };
};

function DisplayString() {
  this.displayString = "";

  this.setDisplayString = function (str) {
    let resultDisplayString = document.querySelector(".result_display_string");
    this.displayString = str;
    resultDisplayString.style.fontSize = (this.displayString.length >= 9) ? "3rem" : "4rem";
    resultDisplayString.innerHTML = str;
  }

  this.getDisplayString = function () {
    return this.displayString;
  }
}

function CalculatorHelper() {
  this.mathOperator = "";
  this.triggerObject = "";
};

function RGB(r = 0, g = 0, b = 0) {
  this.r = r;
  this.g = g;
  this.b = b;

  this.setRGB = function (intR, intG, intB) {
    this.r = intR;
    this.g = intG;
    this.b = intB;
  };

  this.getRGB = function () {
    let arr = [this.r, this.g, this.b];
    return arr;
  };

  this.setColorLighter = function () {
    this.r = (this.r < 255) ? Math.floor(this.r + ((this.r / 100) * 1.2)) : this.r;
    this.g = (this.g < 255) ? Math.floor(this.g - ((this.g / 100) * 1.8)) : this.g;
    this.b = (this.b < 255) ? Math.floor(this.b - ((this.b / 100) * 2.4)) : this.b;
  };

  this.setColorDarker = function () {
    this.r = (this.r > 0) ? Math.ceil(this.r - ((this.r / 100) * 1.2)) : this.r;
    this.g = (this.g > 0) ? Math.ceil(this.g + ((this.g / 100) * 1.8)) : this.g;
    this.b = (this.b > 0) ? Math.ceil(this.b + ((this.b / 100) * 2.4)) : this.b;
  };
};

let calculation = {
  a: null,
  b: null,
  ["+"]: function () { return this.a + this.b },
  ["-"]: function () { return this.a - this.b },
  ["÷"]: function () { return this.a / this.b },
  ["×"]: function () { return this.a * this.b }
};

let interface = {
  ["+"]: "button_plus",
  ["-"]: "button_minus",
  ["/"]: "button_div",
  ["÷"]: "button_div",
  ["*"]: "button_mul",
  ["×"]: "button_mul",
  ["±"]: "button_free2",
  ["%"]: "button_free3",
  ["="]: "button_equ",
  [","]: "button_comma",
  ["0"]: "button_0",
  ["1"]: "button_1",
  ["2"]: "button_2",
  ["3"]: "button_3",
  ["4"]: "button_4",
  ["5"]: "button_5",
  ["6"]: "button_6",
  ["7"]: "button_7",
  ["8"]: "button_8",
  ["9"]: "button_9"
}

function getResult(arr) {
  try {
    for (let i = 0; i <= arr.length - 2; i++) {
      if (arr.length >= (i + 3)) {
        //multiplication, division first!
        if (arr[i].match(/[\-+](?!\d)/) && arr[i + 2].match(/[×÷](?!\d)/)) {
          calculation.a = Number(arr[i + 1]);
          calculation.b = Number(arr[i + 3]);
          let interimResult = calculation[arr[i + 2]]();
          calculation.a = Number(arr[i - 1]);
          calculation.b = interimResult;
          interimResult = calculation[arr[i]]();
          arr.splice(0, 5, interimResult.toString());
          getResult(arr);
        };
      };
      if (arr.length >= 3) {
        if (arr[i].match(/[×\-+÷](?!\d)/)) {
          calculation.a = Number(arr[i - 1]);
          calculation.b = Number(arr[i + 1]);
          let interimResult = calculation[arr[i]]();
          arr.splice(0, 3, interimResult.toString());
          getResult(arr);
        };
      };
    };
  }
  catch (error) {
    alert(error);
  };
  if (arr[0] < Number.MAX_VALUE) {
    return arr[0];
  } else {
    return Infinity;
  }
};

function maxNumberOfDigits(str, maxNumberOfDigits) {
  //Check whether the number of decimal places is greater than mathStr.maxNumberOfDigits, then display as an e function.
  if (str.length >= maxNumberOfDigits) {
    return expo(str, 4).toString();
  } else {
    return str;
  };
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomColor(int) {
  let choice = getRandomInt(2);
  if (choice === 0) {
    return Math.ceil(int - ((int / 100) * 1.5));
  } else {
    return Math.floor(int + ((int / 100) * 1.5));
  };
}


function backspaceStr(str) {
  if (str.length > 1) {
    return str.slice(0, str.length - 1);
  } else if (str.length === 1) {
    return str = "0";
  } else if (str === "") {
    return str = "0";
  };
}

function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

function swapCommaPoint(str) {
  return str.replace(/\./i, ",");
}

function setButtonActive(id) {
  let button = document.getElementById(id);
  button.style.backgroundColor = "#FFFFFF";
  button.style.color = "#202020";
  button.style.borderColor = "#333533";
};

function setButtonInactive(id) {
  let button = document.getElementById(id);
  button.style.backgroundColor = "rgba(245, 245, 245, 0.2)";
  button.style.color = "#202020";
  button.style.borderColor = "#333533";
}

function tSeparator(str) {
  //add thousands separator
  let separatorCount = 0;
  let arrBeforeComma, arrAfterComma = [];
  let arrWithoutMinus = [];
  let strHasComma = false;
  let strHasMinus = false;

  //check if a comma is within string
  strHasComma = str.includes(",");
  strHasMinus = str.includes("-");
  if (strHasComma) {
    arrBeforeComma = str.match(/\d+(?=[\-\.,])/g).join("").split("");
    arrAfterComma = str.match(/,\s*([0-9]*)/g);
    if (arrAfterComma === null) arrAfterComma = [""];
  } else {
    arrBeforeComma = str.match(/([\-0-9])/g);
  };
  if (strHasMinus) {
    arrWithoutMinus = arrBeforeComma.join("").match(/([0-9])/g);
  } else {
    arrWithoutMinus = [...arrBeforeComma];
  }

  let lenOfArrWithoutMinus = arrWithoutMinus.length;
  arrWithoutMinus.reverse();
  for (let i = 0; i <= (lenOfArrWithoutMinus - 1); i++) {
    if ((i > 0) && (i % 3 === 0)) {
      arrWithoutMinus.splice(i + separatorCount, 0, ".");
      separatorCount++;
    };
  };
  arrWithoutMinus.reverse();
  if (strHasMinus) {
    return "-" + arrWithoutMinus.join("") + arrAfterComma.join("");
  }
  else {
    return arrWithoutMinus.join("") + arrAfterComma.join("");
  };
};

function init() {
  let arrOfButtons = document.querySelectorAll("button");
  let resultDisplayString = document.querySelector(".result_display_string");
  let calcAppBody = document.querySelector("body");
  let resetDisplayString = false;
  let arrOfHelper = [];
  let gradient_1_RGB = [new RGB(183, 235, 237), new RGB(51, 152, 230)];
  let gradient_2_RGB = [new RGB(255, 231, 240), new RGB(165, 180, 255)];
  let helper = new CalculatorHelper();
  let mathStr = new MathString();
  let displayStr = new DisplayString();
  let result = null;

  displayStr.setDisplayString("0");
  for (let button of arrOfButtons) {
    button.addEventListener("keydown", (e) => {
      console.log(e);
      switch (e.code) {
        case "Digit0":
        case "Digit1":
        case "Digit2":
        case "Digit3":
        case "Digit4":
        case "Digit5":
        case "Digit6":
        case "Digit7":
        case "Digit8":
        case "Digit9":
        case "Numpad0":
        case "Numpad1":
        case "Numpad2":
        case "Numpad3":
        case "Numpad4":
        case "Numpad5":
        case "Numpad6":
        case "Numpad7":
        case "Numpad8":
        case "Numpad9":
          if (resetDisplayString === true) {
            displayStr.setDisplayString("");
            mathStr.mathStringForOutput = "";
            mathStr.mathStringForCalculation = "";
            resetDisplayString = false;
            if (arrOfHelper.length > 0) {
              setButtonInactive(arrOfHelper[arrOfHelper.length - 1].triggerObject);
              arrOfHelper[arrOfHelper.length - 1].triggerObject = "";
              arrOfHelper[arrOfHelper.length - 1].mathOperator = "";
            };
          };
          if (displayStr.getDisplayString().length <= mathStr.maxNumberOfDigits) {
            if (displayStr.getDisplayString() !== "0") {
              mathStr.setMathStrings(e.key);
              displayStr.setDisplayString(mathStr.mathStringForOutput);
            } else {
              mathStr.mathStringForOutput = e.key;
              mathStr.mathStringForCalculation = e.key;
              displayStr.setDisplayString(mathStr.mathStringForOutput);
            };
          };
          break;
        case "NumpadDecimal":
        case "Comma":
          if (displayStr.getDisplayString().length <= mathStr.maxNumberOfDigits) {
            if (mathStr.mathStringForCalculation.includes(".") === false) {
              mathStr.setMathStrings(e.key);
              displayStr.setDisplayString(mathStr.mathStringForOutput);
            };
          };
          break;
        case "NumpadEnter":
          helper = new CalculatorHelper();
          resetDisplayString = true;
          helper.triggerObject = interface[e.key];
          helper.mathOperator = e.key;
          arrOfHelper.push(helper);
          //add operands to array
          mathStr.arrMathOperations.push(mathStr.mathStringForCalculation);
          const re = /#/;
          if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 1].match(/\#[×\-+÷]\#/)) mathStr.arrMathOperations.splice((mathStr.arrMathOperations.length - 1), 1);
          let string = mathStr.arrMathOperations.join("");
          let arr = string.split(re);
          result = getResult(arr);
          if (result !== "Infinity") {
            result = maxNumberOfDigits(result, mathStr.maxNumberOfDigits);
            mathStr.mathStringForCalculation = result;
            //clear array
            mathStr.arrMathOperations.length = 0;
            if (result.match(/\d+[,\.]\d+e[-+]\d+/g)) {
              mathStr.mathStringForOutput = swapCommaPoint(result);
            } else {
              mathStr.mathStringForOutput = tSeparator(swapCommaPoint(result));
            };
          } else {
            mathStr.mathStringForOutput = "Error: Div/0";
            //clear array
            mathStr.arrMathOperations.length = 0;
          };
          displayStr.setDisplayString(mathStr.mathStringForOutput);
          resetDisplayString = true;
          break;
        case "Backspace":
          if (resetDisplayString === false) {
            mathStr.mathStringForCalculation = backspaceStr(mathStr.mathStringForCalculation);
            mathStr.mathStringForOutput = backspaceStr(mathStr.mathStringForOutput);
            displayStr.setDisplayString(mathStr.mathStringForOutput);
          };
          break;
        case "NumpadAdd":
        case "NumpadSubtract":
        case "NumpadMultiply":
        case "NumpadDivide":
        case "Slash":
        case "BracketRight":
          //helper related
          helper = new CalculatorHelper();
          resetDisplayString = true;
          helper.triggerObject = interface[e.key];
          if (e.code === "NumpadDivide") helper.mathOperator = "÷"
          else if (e.code === "NumpadMultiply") helper.mathOperator = "×"
          else helper.mathOperator = e.key;
          arrOfHelper.push(helper);
          setButtonActive(interface[e.key]);
          //add operands to array
          mathStr.arrMathOperations.push(mathStr.mathStringForCalculation);
          //add operation to array
          if (e.code === "NumpadDivide") mathStr.arrMathOperations.push(`#÷#`)
          else if (e.code === "NumpadMultiply") mathStr.arrMathOperations.push(`#×#`)
          else mathStr.arrMathOperations.push(`#${e.key}#`);
          //the first element in the array may only be a number
          if (mathStr.arrMathOperations[0].match(/\#[×\-+÷]\#/)) {
            mathStr.arrMathOperations.splice(0, 1);
            setButtonInactive(interface[e.key]);
          };
          //just one operation at a time
          if (arrOfHelper.length > 1) {
            if (arrOfHelper[arrOfHelper.length - 2].mathOperator.match(/[×\-+÷]/)) {
              mathStr.arrMathOperations.splice((mathStr.arrMathOperations.length - 3), 3, "#" + arrOfHelper[arrOfHelper.length - 1].mathOperator + "#");
              setButtonInactive(arrOfHelper[arrOfHelper.length - 2].triggerObject);
            };
          };
          //check whether there is a mathematical operation in the foreground. if so, calculate the last operation and output it.
          if (mathStr.arrMathOperations.length > 3) {
            if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 3].match(/\#[×\-+÷]\#/)) {
              // "Remember the order of operations!"
              // PEMDAS: Parentheses (Klammern), Exponents (Potenzen), Multiplication (Multiplikation), Division (Division), Addition (Addition), Subtraction (Subtraktion)
              if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 1].match(/\#[×÷]\#/) && mathStr.arrMathOperations[mathStr.arrMathOperations.length - 3].match(/\#[\-+]\#/)) {
                //multiplication, division first!
                //no interim result
              } else {
                const regEx = /#/;
                let string = mathStr.arrMathOperations.join("");
                let arr = string.split(regEx);
                if (arr[arr.length - 1] === "") arr.pop();
                result = getResult(arr);
                if (result !== "Infinity") {
                  mathStr.mathStringForCalculation = result;
                  mathStr.mathStringForOutput = tSeparator(swapCommaPoint(result));
                } else {
                  mathStr.mathStringForOutput = "Error: Div/0";
                  //clear array
                  mathStr.arrMathOperations.length = 0;
                  resetDisplayString = true;
                };
              };
              if (Number(mathStr.lastCalculatedValue[mathStr.lastCalculatedValue.length - 2]) < Number(mathStr.lastCalculatedValue[mathStr.lastCalculatedValue.length - 1])) {
                gradient_1_RGB[0].setColorDarker();
                gradient_1_RGB[1].setColorDarker();
                gradient_2_RGB[0].setColorDarker();
                gradient_2_RGB[1].setColorDarker();
              } else if (Number(mathStr.lastCalculatedValue[mathStr.lastCalculatedValue.length - 2]) > Number(mathStr.lastCalculatedValue[mathStr.lastCalculatedValue.length - 1])) {
                gradient_1_RGB[0].setColorLighter();
                gradient_1_RGB[1].setColorLighter();
                gradient_2_RGB[0].setColorLighter();
                gradient_2_RGB[1].setColorLighter();
              };
              console.log(`linear-gradient(109deg, rgba(${gradient_1_RGB[0].getRGB().toString()}, 1) 0%, rgba(${gradient_1_RGB[1].getRGB().toString()}, 0.15) 99%),linear-gradient(295deg, rgba(${gradient_2_RGB[0].getRGB().toString()}, 1) 0%, rgba(${gradient_2_RGB[1].getRGB().toString()}, 1) 99%)`);
              calcAppBody.style.backgroundImage = `linear-gradient(109deg, rgba(${gradient_1_RGB[0].getRGB().toString()}, 1) 0%, rgba(${gradient_1_RGB[1].getRGB().toString()}, 0.15) 99%),linear-gradient(295deg, rgba(${gradient_2_RGB[0].getRGB().toString()}, 1) 0%, rgba(${gradient_2_RGB[1].getRGB().toString()}, 1) 99%)`;
              displayStr.setDisplayString(mathStr.mathStringForOutput);
            };
          };
          break;
      };
      console.log(`arrMathOperations: ${mathStr.arrMathOperations}`);
      console.log(`mathStringForCalculation: ${mathStr.mathStringForCalculation}`);
      console.log(`mathStr.mathStringForOutput: ${mathStr.mathStringForOutput}`);
      console.log(`helper.mathOperator: ${helper.mathOperator}`);
    });
  };
  for (let button of arrOfButtons) {
    button.addEventListener("click", (e) => {
      switch (e.target.innerText) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          if (resetDisplayString === true) {
            displayStr.setDisplayString("");
            mathStr.mathStringForCalculation = "";
            mathStr.mathStringForOutput = "";
            resetDisplayString = false;
            if (arrOfHelper.length > 0) {
              setButtonInactive(arrOfHelper[arrOfHelper.length - 1].triggerObject);
              arrOfHelper[arrOfHelper.length - 1].triggerObject = "";
              arrOfHelper[arrOfHelper.length - 1].mathOperator = "";
            };
          };
          if (displayStr.getDisplayString().length <= mathStr.maxNumberOfDigits) {
            if (displayStr.getDisplayString() !== "0") {
              mathStr.setMathStrings(e.target.innerText);
              displayStr.setDisplayString(mathStr.mathStringForOutput);
            } else {
              displayStr.setDisplayString(e.target.innerText);
              mathStr.mathStringForOutput = e.target.innerText;
              mathStr.mathStringForCalculation = e.target.innerText;
            };
          };
          break;
        case ",":
          if (displayStr.getDisplayString().length <= mathStr.maxNumberOfDigits) {
            if (mathStr.mathStringForCalculation.includes(".") === false) {
              mathStr.mathStringForCalculation += ".";
              mathStr.mathStringForOutput += ",";
              displayStr.setDisplayString(mathStr.mathStringForOutput);
            };
          };
          break;
        case "-":
        case "+":
        case "÷":
        case "×":
          //helper related
          helper = new CalculatorHelper();
          resetDisplayString = true;
          helper.triggerObject = e.target.id;
          helper.mathOperator = e.target.innerText;
          arrOfHelper.push(helper);
          setButtonActive(e.target.id);
          //add operands to array
          mathStr.arrMathOperations.push(mathStr.mathStringForCalculation);
          //add operation to array
          mathStr.arrMathOperations.push(`#${e.target.innerText}#`);
          //the first element in the array may only be a number
          if (mathStr.arrMathOperations[0].match(/\#[×\-+÷]\#/)) {
            mathStr.arrMathOperations.splice(0, 1);
            setButtonInactive(e.target.id);
          };
          //just one operation at a time
          if (arrOfHelper.length > 1) {
            if (arrOfHelper[arrOfHelper.length - 2].mathOperator.match(/[×\-+÷]/)) {
              mathStr.arrMathOperations.splice((mathStr.arrMathOperations.length - 3), 3, "#" + arrOfHelper[arrOfHelper.length - 1].mathOperator + "#");
              setButtonInactive(arrOfHelper[arrOfHelper.length - 2].triggerObject);
            };
          };
          //check whether there is a mathematical operation in the foreground. if so, calculate the last operation and output it.
          if (mathStr.arrMathOperations.length > 3) {
            if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 3].match(/\#[×\-+÷]\#/)) {
              // "Remember the order of operations!"
              // PEMDAS: Parentheses (Klammern), Exponents (Potenzen), Multiplication (Multiplikation), Division (Division), Addition (Addition), Subtraction (Subtraktion)
              if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 1].match(/\#[×÷]\#/) && mathStr.arrMathOperations[mathStr.arrMathOperations.length - 3].match(/\#[\-+]\#/)) {
                //multiplication, division first!
                //no interim result
              } else {
                const regEx = /#/;
                let string = mathStr.arrMathOperations.join("");
                let arr = string.split(regEx);
                if (arr[arr.length - 1] === "") arr.pop();
                result = getResult(arr);
                if (result !== "Infinity") {
                  mathStr.mathStringForCalculation = result;
                  mathStr.lastCalculatedValue.push(result);
                  mathStr.mathStringForOutput = tSeparator(swapCommaPoint(result));
                } else {
                  mathStr.mathStringForOutput = "Error: Div/0";
                  //clear array
                  mathStr.arrMathOperations.length = 0;
                  resetDisplayString = true;
                };
              };
              if (Number(mathStr.lastCalculatedValue[mathStr.lastCalculatedValue.length - 2]) < Number(mathStr.lastCalculatedValue[mathStr.lastCalculatedValue.length - 1])) {
                gradient_1_RGB[0].setColorDarker();
                gradient_1_RGB[1].setColorDarker();
                gradient_2_RGB[0].setColorDarker();
                gradient_2_RGB[1].setColorDarker();
              } else if (Number(mathStr.lastCalculatedValue[mathStr.lastCalculatedValue.length - 2]) > Number(mathStr.lastCalculatedValue[mathStr.lastCalculatedValue.length - 1])) {
                gradient_1_RGB[0].setColorLighter();
                gradient_1_RGB[1].setColorLighter();
                gradient_2_RGB[0].setColorLighter();
                gradient_2_RGB[1].setColorLighter();
              };
              console.log(`linear-gradient(109deg, rgba(${gradient_1_RGB[0].getRGB().toString()}, 1) 0%, rgba(${gradient_1_RGB[1].getRGB().toString()}, 0.15) 99%),linear-gradient(295deg, rgba(${gradient_2_RGB[0].getRGB().toString()}, 1) 0%, rgba(${gradient_2_RGB[1].getRGB().toString()}, 1) 99%)`);
              calcAppBody.style.backgroundImage = `linear-gradient(109deg, rgba(${gradient_1_RGB[0].getRGB().toString()}, 1) 0%, rgba(${gradient_1_RGB[1].getRGB().toString()}, 0.15) 99%),linear-gradient(295deg, rgba(${gradient_2_RGB[0].getRGB().toString()}, 1) 0%, rgba(${gradient_2_RGB[1].getRGB().toString()}, 1) 99%)`;
              displayStr.setDisplayString(mathStr.mathStringForOutput);
            };
          };
          break;
        case "=":
          helper = new CalculatorHelper();
          resetDisplayString = true;
          helper.triggerObject = e.target.id;
          helper.mathOperator = e.target.innerText;
          arrOfHelper.push(helper);
          //add operands to array
          mathStr.arrMathOperations.push(mathStr.mathStringForCalculation);
          const re = /#/;
          if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 1].match(/\#[×\-+÷]\#/)) mathStr.arrMathOperations.splice((mathStr.arrMathOperations.length - 1), 1);
          let string = mathStr.arrMathOperations.join("");
          let arr = string.split(re);
          result = getResult(arr);
          if (result !== "Infinity") {
            result = maxNumberOfDigits(result, mathStr.maxNumberOfDigits);
            mathStr.mathStringForCalculation = result;
            //clear array
            mathStr.arrMathOperations.length = 0;
            if (result.match(/-*\d+[,\.]\d+e[-+]\d+/g)) {
              mathStr.mathStringForOutput = swapCommaPoint(result);
            } else {
              mathStr.mathStringForOutput = tSeparator(swapCommaPoint(result));
            };
          } else {
            mathStr.mathStringForOutput = "Error: Div/0";
            //clear array
            mathStr.arrMathOperations.length = 0;
          };
          displayStr.setDisplayString(mathStr.mathStringForOutput);
          resetDisplayString = true;
          break;
        case "%":
          if (mathStr.arrMathOperations.length < 2) {
            calculation.a = mathStr.mathStringForCalculation;
            calculation.b = 100;
            mathStr.mathStringForOutput = calculation["÷"]();
            displayStr.setDisplayString(mathStr.mathStringForOutput);
          } else {
            if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 1].match(/\#[\-+]\#/)) {
              mathStr.mathStringForOutput += e.target.innerText;
              mathStr.mathStringForCalculation = ((mathStr.mathStringForCalculation * mathStr.arrMathOperations[mathStr.arrMathOperations.length - 2]) / 100).toString();
              displayStr.setDisplayString(mathStr.mathStringForOutput);
            } else if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 1].match(/\#[×÷]\#/)) {
              mathStr.mathStringForOutput += e.target.innerText;
              mathStr.mathStringForCalculation = (mathStr.mathStringForCalculation / 100).toString();
              displayStr.setDisplayString(mathStr.mathStringForOutput);
            };
          };
          break;
        case "C":
          location.reload();
          break;
        case "±":
          let tempStr = "";
          mathStr.mathStringForCalculation = tempStr.concat("-", mathStr.mathStringForCalculation);
          mathStr.mathStringForOutput = tempStr.concat("-", mathStr.mathStringForOutput);
          displayStr.setDisplayString(mathStr.mathStringForOutput);
      };
      console.log(`arrMathOperations: ${mathStr.arrMathOperations}, index: ${mathStr.arrMathOperations.length - 1}`);
      console.log(`calculation.a: ${calculation.a}`);
      console.log(`calculation.b: ${calculation.b}`);
      console.log(`result: ${result}`);
      console.log(`mathStr.lastCalculatedValue: ${mathStr.lastCalculatedValue}`);
      console.log(`mathStringForCalculation: ${mathStr.mathStringForCalculation}`);
      console.log(`mathStr.mathStringForOutput: ${mathStr.mathStringForOutput}`);
      console.log(`helper.mathOperator: ${helper.mathOperator}`);
      console.log(`--------`)
    });
  };
};

init();

