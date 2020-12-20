const input = Deno.readTextFileSync("./day-16/input.txt")
const [rulesInput, myTicketInput, nearbyTicketsInput] = input.split('\n\n')

const stage1 = (rulesInput: string, nearbyTicketsInput: string) => {
  const nearbyTickets = nearbyTicketsInput.split("\n").slice(1).map(x => x.split(',').map(n => Number(n)))

  const rules = new Map<string, (x: number) => boolean>()

  rulesInput.split('\n').forEach(row => {
    const [name, rulesInput] = row.split(':')
    const tests = rulesInput.split("or").map(range => range.split('-').map(n => Number(n)))
    console.log(tests)

    const test = (val: number): boolean => {
      return tests.some(([min, max]) => (val >= min) && (val <= max))
    }

    rules.set(name, test)
  })

  let invalids: number[] = []

  nearbyTickets.forEach(t => {
    t.forEach(value => {
      let isValid = false

      rules.forEach(test => {
        isValid = isValid || test(value)
      })

      if (!isValid) {
        invalids.push(value)
      }
    })
  })

  return invalids.reduce((a, b) => a + b)
}

const testRules = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50`

const testTickets = `nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`

const calculateIndex = (rules: Map<string, { test: (x: number) => boolean, index: number[], finalIndex?: number }>, tickets: number[][]) => {
  rules.forEach((rule, key) => {
    rule.index = []

    const finalIdxs = Array.from(rules.values()).map(r => r.finalIndex)
    for (let x = 0; x < 20; x++) {

      if (!finalIdxs.includes(x) && tickets.every(row => rule.test(row[x]))) {
        rule.index.push(x)
      }
    }

  })
}

// This solution is super ugly but I don't care anymore :D 
const stage2 = (rulesInput: string, nearbyTicketsInput: string) => {
  const nearbyTickets = nearbyTicketsInput.split("\n").slice(1).map(x => x.split(',').map(n => Number(n)))

  const rules = new Map<string, { test: (x: number) => boolean, index: number[], finalIndex?: number }>()

  rulesInput.split('\n').forEach(row => {
    const [name, rulesInput] = row.split(':')
    const tests = rulesInput.split("or").map(range => range.split('-').map(n => Number(n)))
    // console.log(tests)

    const test = (val: number): boolean => {
      return tests.some(([min, max]) => (val >= min) && (val <= max))
    }

    rules.set(name, { test, index: [] })
  })

  const cleanedTickets: number[][] = nearbyTickets.filter(t => {
    return t.every(value => {
      let isValid = false

      rules.forEach(test => {
        isValid = isValid || test.test(value)
      })

      return isValid
    })
  })

  let finished = false

  while (!finished) {
    calculateIndex(rules, cleanedTickets)
    let isDone = true
    rules.forEach(rule => {
      if (rule.index.length === 1) {
        rule.finalIndex = rule.index[0]

      }
      isDone = isDone && rule.finalIndex !== undefined
    })

    finished = isDone
  }

  const myTicket = myTicketInput.split("\n")[1].split(',').map(n => Number(n))

  return myTicket.filter((val, i) => {
    let valid = false

    rules.forEach((value, key) => {
      if (key.startsWith('departure') && value.finalIndex === i) {
        valid = true
      }
    })

    return valid
  }).reduce((a, b) => a * b, 1)

}

console.log(stage2(rulesInput, nearbyTicketsInput))