const input = Deno.readTextFileSync("./day-09/input.txt")
const rows: number[] = input.split('\n').map(i => Number(i))

const isSumOfPreamble = (preamble: number[], target: number) => {
  for (let x = 0; x < preamble.length; x++) {
    for (let y = x + 1; y < preamble.length; y++) {

      if (preamble[x] + preamble[y] === target) {
        return true
      }
    }
  }
  return false
}

const stage1 = () => {
  for (let i = 26; i < rows.length; i++) {
    const preamble = rows.slice(i - 25, i)

    if (!isSumOfPreamble(preamble, rows[i])) {
      return [i, rows[i]]
    }

  }

  return [0, 0]
}


const getSum = (range: number[], target: number) => {
  for (let x = 0; x < range.length; x++) {
    let sum = 0
    for (let y = x; y < range.length; y++) {
      sum = sum + range[y]
      if (sum === target) {
        return [x, y]
      }

      if (sum > target) {
        break
      }
    }
  }
  return [0, 0]
}

const stage2 = () => {
  const [x, y] = getSum(rows.slice(0, 652), 1504371145)
  const range = rows.slice(x, y)

  return Math.min(...range) + Math.max(...range)
}


// console.log(stage1())
console.log(stage2())