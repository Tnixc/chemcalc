export function splitAtomicSymbols(input: string) {
  const atomicSymbolsWithNumbers = input.match(/[A-Z][a-z]*\d*/g) || [];
  const atomicSymbolsWithoutNumbers = atomicSymbolsWithNumbers.map((token) =>
    token.replace(/\d/g, "")
  );
  return atomicSymbolsWithoutNumbers;
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

export function evaluateChemicalFormula(tokens: (string | number)[]): { [key: string]: number } {
  const elementCounts: { [key: string]: number } = {};
  const stack: number[] = [1];
  if (typeof tokens[0] === 'number') {
    return elementCounts;
  }
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];

    if (typeof token === 'string' && /[A-Z]/.test(token)) {
      const currentElement = token;
      i += 1;
      let currentMultiplier = 1;
      if (i < tokens.length && typeof tokens[i] === 'number') {
        currentMultiplier = tokens[i] as number;
        i += 1;
      }
      elementCounts[currentElement] = (elementCounts[currentElement] || 0) + currentMultiplier * stack[stack.length - 1];

    } else if (token === '(') {
      i += 1;
      const subFormula: (string | number)[] = [];
      while (i < tokens.length && tokens[i] !== ')') {
        subFormula.push(tokens[i]);
        i += 1;
      }
      i += 1;
      let currentMultiplier = 1;
      if (i < tokens.length && typeof tokens[i] === 'number') {
        currentMultiplier = tokens[i] as number;
        i += 1;
      }
      const subElementCounts = evaluateChemicalFormula(subFormula);
      for (const [element, count] of Object.entries(subElementCounts)) {
        elementCounts[element] = (elementCounts[element] || 0) + count * currentMultiplier * stack[stack.length - 1];
      }

    } else if (token === ')') {
      i += 1;
      if (i < tokens.length && typeof tokens[i] === 'number') {
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
console.log(splitAtomicSymbols('2'));
console.log(tokenize('2'));
console.log(convertStringsToInt(tokenize('2')));
console.log(evaluateChemicalFormula(convertStringsToInt(tokenize('2'))))