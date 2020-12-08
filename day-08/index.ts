const input = Deno.readTextFileSync("./day-08/input.txt")
const rows = input.split('\n')

type Opertaion = 'nop' | 'acc' | 'jmp'

interface Instruction {
  operation: Opertaion
  argument: number,
  visited: boolean
}

const stage1 = () => {
  const instructions: Instruction[] = rows.map(row => {
    const [operation, argument] = row.split(" ")
    return {
      operation: operation as Opertaion, argument: Number(argument), visited: false
    }
  })

  let accumulator = 0
  let pointer = 0

  while (!instructions[pointer].visited) {
    const instruction = instructions[pointer]
    const { operation, argument, visited } = instruction

    instruction.visited = true

    switch (operation) {
      case "acc":
        accumulator += argument
        pointer++
        break
      case "jmp":
        pointer += argument
        break
      case "nop":
        pointer++
        break
    }
  }

  return accumulator
}

const run = (instructions: Instruction[]) => {
  let accumulator = 0
  let prevPointer = 0
  let pointers = [0]

  for (const pointer of pointers) {
    const instruction = instructions[pointer]

    if (!instruction) {
      return {
        accumulator
      }
    }

    const { operation, argument, visited } = instruction

    if (visited) {
      return {
        accumulator,
        badInstruction: pointer
      }
    }

    instruction.visited = true
    prevPointer = pointer

    switch (operation) {
      case "acc":
        accumulator += argument
        pointers.push(pointer + 1)
        break
      case "jmp":
        pointers.push(pointer + argument)
        break
      case "nop":
        pointers.push(pointer + 1)
        break
      default:
        pointers.push(pointer + 1)
        break
    }
  }

  return { accumulator }
}

const parseRow = (row: string) => {
  const [operation, argument] = row.split(" ")
  return {
    operation: operation as Opertaion, argument: Number(argument), visited: false
  }
}

const stage2 = () => {
  const instructions: Instruction[] = rows.map(parseRow)

  let accumulator = -1

  instructions.forEach((instruction, i) => {
    // this is ugly, duplicate, messy and stuff, but whatever 🙂
    if (instruction.operation === "jmp") {
      const fixedInstructions = rows.map(parseRow)
      fixedInstructions[i].operation = 'nop'
      const res = run(fixedInstructions)

      if (res.badInstruction === undefined) {
        accumulator = res.accumulator
      }
    } else if (instruction.operation === "nop") {
      const fixedInstructions = rows.map(parseRow)
      fixedInstructions[i].operation = 'jmp'
      const res = run(fixedInstructions)

      if (res.badInstruction === undefined) {
        accumulator = res.accumulator
      }
    }
  })

  return accumulator
}


// console.log(stage1())
console.log(stage2())