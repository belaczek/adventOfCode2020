"use strict";
const input = Deno.readTextFileSync("./day-09/input.txt");
const rows = input.split('\n').map(i => Number(i));
const isSumOfPreamble = (preamble, target) => {
    for (let x = 0; x < preamble.length; x++) {
        for (let y = x + 1; y < preamble.length; y++) {
            if (preamble[x] + preamble[y] === target) {
                return true;
            }
        }
    }
    return false;
};
const stage1 = () => {
    // let preamble = rows.slice(0, 24)
    // let nums = rows.slice(25, rows.length)
    // const preamble = rows.slice(26 - 26, 26 - 1)
    // console.log(preamble, preamble.length)
    for (let i = 26; i < rows.length; i++) {
        const preamble = rows.slice(i - 25, i);
        if (!isSumOfPreamble(preamble, rows[i])) {
            return [i, rows[i]];
        }
    }
    return [0, 0];
};
const getSum = (range, target) => {
    for (let x = 0; x < range.length; x++) {
        let sum = 0;
        for (let y = x; y < range.length; y++) {
            sum = sum + range[y];
            if (sum === target) {
                return [x, y];
            }
            if (sum > target) {
                break;
            }
            // range.slice(x, range.length).forEach((num, y) => {
            //   sum += num
            //   if (sum === target) {
            //     return [x, y]
            //   }
            // })
        }
    }
    return [0, 0];
};
const stage2 = () => {
    // const [i, sum] = stage1()
    // console.log(rows.slice(0, 652), 1504371145)
    const [x, y] = getSum(rows.slice(0, 652), 1504371145);
    const range = rows.slice(x, y);
    return [Math.min(...range), Math.max(...range)];
    // for (let x = 0; x < i; x++) {
    //   const isSum = rows.slice(x, i).reduce(())
    // }
};
// console.log(stage1())
console.log(stage2());
//# sourceMappingURL=file:///home/runner/adventOfCode2020/.deno/gen/file/home/runner/adventOfCode2020/day-09/index.ts.js.map