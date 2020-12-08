"use strict";
const input = Deno.readTextFileSync("./day-08/input.txt");
const rows = input.split('\n');
const stage1 = () => {
    const instructions = rows.map(row => {
        const [operation, argument] = row.split(" ");
        return {
            operation: operation,
            argument: Number(argument), visited: false
        };
    });
    let accumulator = 0;
    let pointer = 0;
    while (!instructions[pointer].visited) {
        const instruction = instructions[pointer];
        const { operation, argument, visited } = instruction;
        instruction.visited = true;
        switch (operation) {
            case "acc":
                accumulator += argument;
                pointer++;
                break;
            case "jmp":
                pointer += argument;
                break;
            case "nop":
                pointer++;
                break;
        }
    }
    return accumulator;
};
const findBadInstruction = (instructions, pointers) => {
    for (let i = pointers.length - 1; i >= 0; i--) {
        if (instructions[pointers[i]].operation === 'jmp') {
            return pointers[i];
        }
    }
    return -1;
};
const run = (instructions) => {
    let accumulator = 0;
    let prevPointer = 0;
    let pointers = [0];
    for (const pointer of pointers) {
        const instruction = instructions[pointer];
        if (!instruction) {
            return {
                accumulator
            };
        }
        const { operation, argument, visited } = instruction;
        if (visited) {
            // console.log('visited', { accumulator, prevPointer, pointers, lastJmp: findBadInstruction(instructions, pointers) })
            return {
                accumulator,
                badInstruction: pointer
            };
        }
        instruction.visited = true;
        prevPointer = pointer;
        switch (operation) {
            case "acc":
                accumulator += argument;
                pointers.push(pointer + 1);
                break;
            case "jmp":
                pointers.push(pointer + argument);
                break;
            case "nop":
                pointers.push(pointer + 1);
                break;
            default:
                pointers.push(pointer + 1);
                break;
        }
    }
    // while (pointer < instructions.length && !instructions[pointer].visited) {
    //   const instruction = instructions[pointer]
    //   const { operation, argument, visited } = instruction
    //   instruction.visited = true
    //   prevPointer = pointer
    //   switch (operation) {
    //     case "acc":
    //       accumulator += argument
    //       pointer++
    //       break
    //     case "jmp":
    //       pointer += argument
    //       break
    //     case "nop":
    //       pointer++
    //       break
    //     default:
    //       pointer++
    //       break
    //   }
    // }
    // if (prevPointer < instructions.length - 1) {
    //   return {
    //     badInstruction: prevPointer,
    //     accumulator
    //   }
    // }
    return { accumulator };
};
const parseRow = (row) => {
    const [operation, argument] = row.split(" ");
    return {
        operation: operation,
        argument: Number(argument), visited: false
    };
};
const stage2 = () => {
    const instructions = rows.map(parseRow);
    // let res = run(instructions)
    // const fixedInstructions = rows.map(parseRow)
    let accumulator = -1;
    instructions.forEach((instruction, i) => {
        if (instruction.operation === "jmp") {
            const fixedInstructions = rows.map(parseRow);
            fixedInstructions[i].operation = 'nop';
            const res = run(fixedInstructions);
            if (res.badInstruction === undefined) {
                accumulator = res.accumulator;
            }
        }
        else if (instruction.operation === "nop") {
            const fixedInstructions = rows.map(parseRow);
            fixedInstructions[i].operation = 'jmp';
            const res = run(fixedInstructions);
            if (res.badInstruction === undefined) {
                accumulator = res.accumulator;
            }
            // return
        }
    });
    // console.log(res)
    // while (res.badInstruction !== undefined) {
    //   fixedInstructions.forEach(instr => { instr.visited = false })
    //   fixedInstructions[res.badInstruction!].operation = 'nop'
    //   res = run(fixedInstructions)
    // }
    // console.log(res)
    return accumulator;
};
// console.log(stage1())
console.log(stage2());
//# sourceMappingURL=file:///home/runner/adventOfCode2020/.deno/gen/file/home/runner/adventOfCode2020/day-08/index.ts.js.map