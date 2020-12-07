"use strict";
const text = Deno.readTextFileSync("./day-2/input.txt");
const rows = text.split('\n');
const parseRow = (row) => {
    const [range, target, password] = row.split(' ');
    return {
        range: range.split("-").map(s => Number(s)),
        target: target.slice(0, target.length - 1),
        password
    };
};
console.log(parseRow(rows[0]));
const isValid = (row) => {
    const { range, target, password } = parseRow(row);
    // console.log({ range, target, password })
    const count = [...password].filter(s => s === target).length;
    return count > range[0] && count < range[1];
};
const valid = rows.filter(isValid);
console.log(valid);
//# sourceMappingURL=file:///home/runner/adventOfCode2020/.deno/gen/file/home/runner/adventOfCode2020/day-2/index.ts.js.map