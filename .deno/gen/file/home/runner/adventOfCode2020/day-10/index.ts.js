"use strict";
const input = Deno.readTextFileSync("./day-10/input.txt");
const rows = input.split('\n').map(i => Number(i));
const stage1 = () => {
    const builtInJolts = Math.max(...rows) + 3;
    const input = [0, ...rows, builtInJolts].sort((a, b) => a - b);
    let jolt1 = 0;
    let jolt3 = 0;
    input.forEach((value, i) => {
        switch (value - input[i - 1]) {
            case 1:
                jolt1++;
                break;
            case 3:
                jolt3++;
                break;
        }
    });
    return [jolt1 * jolt3];
};
const getVariations = (v) => {
    return new Array(v - 1)
        .fill(0)
        .reduce((acc, n, i) => acc + i, 1);
};
const stage2 = () => {
    const builtInJolts = Math.max(...rows) + 3;
    const input = [0, ...rows, builtInJolts].sort((a, b) => a - b);
    const combinations = [];
    for (let i = 0; i < input.length - 1; i++) {
        if (input[i + 1] - input[i] === 1) {
            const start = i;
            while (input[i + 1] - input[i] === 1) {
                i++;
            }
            combinations.push(i - start + 1);
        }
    }
    return combinations
        .map(getVariations)
        .reduce((a, v) => a * v, 1);
};
// console.log(stage1())
console.log(stage2());
//# sourceMappingURL=file:///home/runner/adventOfCode2020/.deno/gen/file/home/runner/adventOfCode2020/day-10/index.ts.js.map