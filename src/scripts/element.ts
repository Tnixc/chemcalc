import fetch from "sync-fetch";

export function removeNumbers(input: string) {
  const atomicSymbolsWithNumbers = input.match(/[A-Z][a-z]*\d*/g) || [];
  const atomicSymbolsWithoutNumbers = atomicSymbolsWithNumbers.map((token) =>
    token.replace(/\d/g, "")
  );
  return atomicSymbolsWithoutNumbers;
}
export function getElementData() {
  const response = fetch(
    "https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json"
  );
  const data = response.json();
  return data;
}
export function processSymbols(data: any) {
  const elementSymbols = data.elements.map((element: any) => element.symbol);
  return elementSymbols;
}
export function filterValidElements(
  obj: { [key: string]: number }, // this would be the element counts object
  keysArray: string[] // Array with valid element symbols
): { [key: string]: number } {
  const result: { [key: string]: number } = {};
  for (const key of keysArray) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function tokenize(inputStr: string): string[] {
  const regex = /[A-Z][a-z]*\d*|\d+|\(|\)/g;
  const tokens = inputStr.match(regex) || [];
  const splitTokens: string[] = [];

  for (const token of tokens) {
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

export function evaluateElementCounts(tokens: (string | number)[]): {
  [key: string]: number;
} {
  const elementCounts: { [key: string]: number } = {};
  const stack: number[] = [1];
  if (typeof tokens[0] === "number") {
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
export function getElementNameFromSymbol(inputObject: { [key: string]: number }, obj2: { elements: any[] }): { [key: string]: any } {
  const resultObject: { [key: string]: any } = { ...inputObject };

  function searchElement(elements: any[], symbol: string) {
    for (const element of elements) {
      if (element.symbol === symbol) {
        return {
          name: element.name,
          count: resultObject[symbol] || 0
        };
      }
    }
    return null;
  }

  for (const symbol of Object.keys(resultObject)) {
    const validElementsObject = searchElement(obj2.elements, symbol);

    if (validElementsObject) {
      const { name, count } = validElementsObject;
      resultObject[symbol] = [name, count];
    }
  }

  return resultObject;
}
export const elementDataObject = getElementData();
export const validElementSymbols = processSymbols(getElementData());
