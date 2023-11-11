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
export function removeJunkFromObjectKey(obj: object): object {
  const newObj:any = {};
  for (const key in obj){
    if (validElementSymbols.includes(key)){
      newObj[key] = obj[key as keyof typeof obj];
    }
  }
  return newObj;
}
export function removeJunkFromObjectValue(obj: any): any {
  const newObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key].replace(/[^0-9.]/g, '');
    }
  }
  return newObj;
}
