"use strict";
const text = Deno.readTextFileSync("./input.txt");
const arr = text.split('\n');
const targetSum = 2020;
let num1 = Infinity;
let num2 = Infinity;
let num3 = Infinity;
for (let x = 0; x < arr.length - 1; x++) {
    num1 = Number(arr[x]);
    for (let y = x + 1; y < arr.length - 1; y++) {
        num2 = Number(arr[y]);
        for (let z = y + 1; z < arr.length - 1; z++) {
            num3 = Number(arr[z]);
            if (num1 + num2 + num3 === targetSum) {
                break;
            }
        }
        if (num1 + num2 + num3 === targetSum) {
            break;
        }
    }
    if (num1 + num2 + num3 === targetSum) {
        break;
    }
}
console.log(num1, num2, num3, num1 + num2 + num3);
console.log(num1 * num2 * num3);
//# sourceMappingURL=file:///home/runner/VacantSpanishLightweightprocess/.deno/gen/file/home/runner/VacantSpanishLightweightprocess/index.ts.js.map