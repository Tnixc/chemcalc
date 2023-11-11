import {validElementSymbols} from "./molecular";
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
export function removeJunkFromObjectValue(obj: object): object {
  const newObj:any = {};
  for (const key in obj){
    console.log(`key: ${key}, value: ${obj[key as keyof typeof obj]}`)
    console.log(key)
    if (validElementSymbols.includes(key)){
      newObj[key] = obj[key as keyof typeof obj];
    }
    console.log(newObj)
  }
  return newObj;
}
