"use strict";
const input = Deno.readTextFileSync("./day-03/input.txt");
const slopeMap = input.split('\n').map(row => [...row]);
const rowLengts = slopeMap[0].length;
const getCharAtPosition = (row, pointer) => {
    return row[pointer % rowLengts];
};
const calculateTrees = (slope) => {
    let treesCount = 0;
    let posX = 0;
    let posY = 0;
    while (posY < slopeMap.length - 1) {
        posX += slope[0];
        posY += slope[1];
        const currentRow = slopeMap[posY];
        const char = getCharAtPosition(currentRow, posX);
        if (char === '#') {
            treesCount++;
        }
    }
    return treesCount;
};
const slopeDirections = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
const result = slopeDirections.map(calculateTrees).reduce((acc, count) => { return acc * count; }, 1);
console.log(result);
//# sourceMappingURL=file:///home/runner/adventOfCode2020/.deno/gen/file/home/runner/adventOfCode2020/day-03/index.ts.js.map