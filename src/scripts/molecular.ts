import fetch from "sync-fetch";

export function error(message: string) {
  // Create a div element for the error notification
  const notification = document.createElement("div");
  notification.className = "error";
  notification.textContent = message;

  // Append the notification to the body
  document.body.appendChild(notification);

  // Automatically remove the notification after 3 seconds
  setTimeout(() => {
    notification.classList.add("fadeOut");
    setTimeout(() => {
      notification.remove();
    }, 1000); // 1 second for the fade-out animation
  }, 4000); // 3 seconds for the notification to stay visible
}

export function getElementData() {
  const response = fetch(
    "https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json"
  );
  const data = response.json();
  return data;
}
function processSymbols(data: any) {
  const elementSymbols = data.elements.map((element: any) => element.symbol);
  return elementSymbols;
}

export const elementDataObject = getElementData();
export const validElementSymbols = processSymbols(getElementData());

export function removeNumbers(input: string) {
  const atomicSymbolsWithNumbers = input.match(/[A-Z][a-z]*\d*/g) || [];
  const atomicSymbolsWithoutNumbers = atomicSymbolsWithNumbers.map((token) =>
    token.replace(/\d/g, "")
  );
  return atomicSymbolsWithoutNumbers;
}

function rmNumbers(arr: (string | number)[]): (string | number)[] {
  const result: (string | number)[] = [];
  let consecutiveNumbers = 0;

  for (const item of arr) {
    if (typeof item === "number") {
      consecutiveNumbers++;
      if (consecutiveNumbers <= 2) {
        result.push(item);
      }
    } else {
      consecutiveNumbers = 0;
      result.push(item);
    }
  }

  return result;
}

function filterArrayIntersection(
  arr1: (string | number)[],
  arr2: string[]
): (string | number)[] {
  const result: (string | number)[] = [];

  for (const item of arr1) {
    if (typeof item === "string" && arr2.includes(item)) {
      result.push(item);
    }
    if (item === "(" || item === ")") {
      result.push(item);
    }
    if (typeof item === "number") {
      result.push(item);
    }
    if (
      typeof item === "string" &&
      item !== "(" &&
      item !== ")" &&
      !arr2.includes(item)
    ) {
      error(`Invalid element symbol: ${item}. It has been removed.`);
    }
  }
  return result;
}
export function tokenize(inputStr: string): string[] {
  const regex = /[A-Z][a-z]*\d*|\d+|\(|\)/g;
  const tokens = inputStr.match(regex) || [];
  const splitTokens: string[] = [];
  for (const token of tokens) {
    if (
      typeof token === "string" &&
      token !== "(" &&
      token !== ")" &&
      token.match(/^[a-z]/)
    ) {
      error("Invalid formula or element symbol");
    }
    const elements = token.match(/[A-Z][a-z]*|\d+|\(|\)/g) || [];
    splitTokens.push(...elements);
  }

  return splitTokens;
}
export function convertStringsToInt(arr: string[]): (string | number)[] {
  const result: (string | number)[] = [];
  for (const item of arr) {
    if (item.match(/^\d+$/)) {
      result.push(parseInt(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

export function evaluateElementCounts(x: (string | number)[]): {
  [key: string]: number;
} {
  const elementCounts: { [key: string]: number } = {};
  let tokens = rmNumbers(filterArrayIntersection(x, validElementSymbols));
  const stack: number[] = [1];
  if (typeof tokens[0] === "number") {
    error("Invalid formula or element symbol");
    return elementCounts;
  }
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];

    if (typeof token === "string" && /[A-Z]/.test(token)) {
      const currentElement = token;
      i += 1;
      let currentMultiplier = 1;
      if (i < tokens.length && typeof tokens[i] === "number") {
        currentMultiplier = tokens[i] as number;
        i += 1;
      }
      elementCounts[currentElement] =
        (elementCounts[currentElement] || 0) +
        currentMultiplier * stack[stack.length - 1];
    } else if (token === "(") {
      i += 1;
      const subFormula: (string | number)[] = [];
      while (i < tokens.length && tokens[i] !== ")") {
        subFormula.push(tokens[i]);
        i += 1;
      }
      i += 1;
      let currentMultiplier = 1;
      if (i < tokens.length && typeof tokens[i] === "number") {
        currentMultiplier = tokens[i] as number;
        i += 1;
      }
      const subElementCounts = evaluateElementCounts(subFormula);
      for (const [element, count] of Object.entries(subElementCounts)) {
        elementCounts[element] =
          (elementCounts[element] || 0) +
          count * currentMultiplier * stack[stack.length - 1];
      }
    } else if (token === ")") {
      i += 1;
      if (i < tokens.length && typeof tokens[i] === "number") {
        stack.pop();
        stack.push(tokens[i] as number);
        i += 1;
      } else {
        stack.pop();
      }
    }
  }

  return elementCounts;
}
export function getElementNameFromSymbol(
  inputObject: { [key: string]: number },
  validData: { elements: any[] }
): { [key: string]: any } {
  const resultObject: { [key: string]: any } = { ...inputObject };

  function searchElement(elements: any[], symbol: string) {
    for (const element of elements) {
      if (element.symbol === symbol) {
        return {
          name: element.name,
          atomicMass: element.atomic_mass,
          count: resultObject[symbol] || 0,
        };
      }
    }
    return null;
  }

  for (const symbol of Object.keys(resultObject)) {
    const validElementsObject = searchElement(validData.elements, symbol);

    if (validElementsObject) {
      const { name, count, atomicMass } = validElementsObject;
      resultObject[symbol] = [name, count, atomicMass];
    }
  }

  return resultObject;
}
export function getTotalMolarMass(inputObject: {
  [key: string]: [string, number, number];
}): number {
  let totalSum = 0;

  for (const key in inputObject) {
    if (inputObject.hasOwnProperty(key)) {
      const [_, firstNumber, secondNumber] = inputObject[key];
      totalSum += firstNumber * secondNumber;
    }
  }
  return totalSum;
}
export function getElementMakeup(inputObject: {
  [key: string]: [string, number, number];
}): { [key: string]: number } {
  let total = getTotalMolarMass(inputObject);
  const result: { [key: string]: number } = {};
  for (const key in inputObject) {
    const [_, firstNumber, secondNumber] = inputObject[key];
    const value =
      Math.round(((firstNumber * secondNumber) / total) * 100 * 100) / 100;
    result[key] = value;
  }
  return result;
}
