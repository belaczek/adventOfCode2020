const text = Deno.readTextFileSync("./day-02/input.txt");
const rows = text.split('\n')

const parseRow = (row: string) => {
  const [range, target, password] = row.split(' ')

  return {
    range: range.split("-").map(s => Number(s)),
    target: target.slice(0, target.length - 1),
    password
  }
}
console.log(parseRow(rows[0]))

const isValid = (row: string) => {

  const { range, target, password } = parseRow(row)
  // const count = [...password].filter(s => s === target).length
  const arrPw = [...password]
  const [first, second] = range
  return (arrPw[first - 1] === target) !== (arrPw[second - 1] === target)
}

const valid = rows.filter(isValid)

console.log(valid.length)