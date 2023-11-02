import fetch from "sync-fetch";

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
export function cleanUpMolarMass(inputString: string): string {
  if (typeof inputString !== "string") {
    return "";
  }
  return inputString.replace(/[^0-9.\s]/g, '');
}
console.log(cleanUpMolarMass("njvkdaiv.3098u031ue031.829482"))
export const elementDataObject = getElementData();
export const validElementSymbols = processSymbols(getElementData());
