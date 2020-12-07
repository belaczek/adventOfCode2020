const input = Deno.readTextFileSync("./day-05/input.txt")


const inputRows = input.split('\n')

export function getId(pass: string) {
  let row = 0,
    column = 0

  for (const char of pass) {
    switch (char) {
      case 'F':
        row <<= 1
        break
      case 'B':
        row <<= 1
        row |= 1
        break
      case 'L':
        column <<= 1
        break
      case 'R':
        column <<= 1
        column |= 1
        break
    }
  }

  return row * 8 + column
}




const ids = inputRows.map(getId)
const max = ids.reduce((a, b) => Math.max(a, b))

console.log(max)

const sorted = ids.sort((a, b) => a - b)

let missingId = 0

sorted.forEach((id, i) => {
  if (!sorted.includes(id + 1) && sorted.includes(id + 2)) {
    missingId = id + 1
  }
})

console.log(missingId)


// const stage1 = () => {


  // console.log(Math.max(...st1Input))


  // console.log(getTargetValue(["B", "F", "F", "F", "B", "B", "F"], 64))
  // console.log(getTargetValue(["B", "B", "F", "F", "B", "B", "F"], 64))
  // console.log(getTargetValue(["R","L","L" ], 4))
  // console.log(calculateId(102, 4))
  // console.log(calculate('RRR'))
  // console.log(calculate('FBFBBFF'))

// }



// stage1()