function add(num1: number, num2: number): number {
  printToConsole(num1 + num2);
  return num1 + num2;
}

function printToConsole(input: number): void {
  console.log(input);
}

let combineValues: Function; // not very precise
let betterCombineValues: (a: number, b: number) => number; // returns a function which accepts 2 parameters and returns a number

combineValues = add;
betterCombineValues = add;

add(1, 2);
function addAndPrint(
  num1: number,
  num2: number,
  cb: (input: number) => void
): number {
  cb(num1 + num2);
  return num1 + num2;
}

addAndPrint(2, 2, printToConsole);
