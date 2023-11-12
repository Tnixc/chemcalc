import {validElementSymbols, elementDataObject} from "./molecular";

function searchElement(elements: any[], symbol: string) {
  for (const element of elements) {
    if (element.symbol === symbol) {
      return {
        atomicMass: element.atomic_mass,
      };
    }
  }
  return null;
}
export function getMolarMass(symbol: string): number {
  const validElementsObject = searchElement(elementDataObject.elements, symbol);
  if (validElementsObject) {
    const { atomicMass } = validElementsObject;
    return atomicMass;
  }
  return 0;
}
export function removeItemsWithoutColon(items: string[]): string[] {
  return items.filter((item) => item.includes(":"));
}
export function turnIntoObjectByColon(items: string[]): object {
  const obj:any = {};
  items.forEach((item) => {
    const [key, value] = item.split(":");
    obj[key] = value;
  });
  return obj;
}
export function removeJunkFromObjectKey(obj: object): object {
  const newObj:any = {};
  for (const key in obj){
    if (validElementSymbols.includes(key)){
      newObj[key] = obj[key as keyof typeof obj];
    }
  }
  return newObj;
}
export function removeJunkFromObjectValue(obj: any): object {
  const newObj: any = {};
  for (const key in obj) {
    if (obj[key] !== "") {
    newObj[key] = parseFloat(obj[key].replace(/[^0-9.]/g, ''));
    }
  }
  return newObj;
}
export function turnValueIntoMoles(obj: any): object{
  const newObj: any = {};
  for (const key in obj) {
    newObj[key] = obj[key]/getMolarMass(key.toString()) ;
  }
  return newObj;
} 
export function findRatio(obj: object): object{
  const newObj: any = {};
  const values = Object.values(obj);
  const min = Math.min(...values);
  for (const key in obj) {
    newObj[key] = Math.round(obj[key as keyof typeof obj]/min * 100) / 100;
  }
  return newObj;

}