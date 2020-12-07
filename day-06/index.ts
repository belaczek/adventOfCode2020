const input = Deno.readTextFileSync("./day-06/input.txt")

const groups = input.split('\n\n')

const getSum = (input: string) => {
  const yesAnswers = new Set()
  input
    .split("\n")
    .forEach(yeses => [...yeses].forEach((y) => yesAnswers.add(y)))

  return yesAnswers.size
}


const intersection = (a: string[], b: string[]) => a.filter(c => b.includes(c))

const getIntersectionCount = (input: string) => {
  let arr: string[] | undefined
  input
    .split("\n")
    .forEach(yeses => {
      arr = arr ? intersection(arr, [...yeses]) : [...yeses]
    })

  return arr ? arr.length : 0
}

const stage1 = () => {
  return groups.map(getSum).reduce((a, b) => a + b)
}


const stage2 = () => {
  return groups.map(getIntersectionCount).reduce((a, b) => a + b)
}

console.log(stage1())
console.log(stage2())