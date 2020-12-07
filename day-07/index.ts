const input = Deno.readTextFileSync("./day-07/input.txt")
const rows = input.split('\n')

interface Parsed {
  [key: string]: {
    [key: string]: number
  }
}

const rule1 = /(\w+\s\w+) bags contain (.*)/
const rule2 = /(\d+) (\w+\s\w+)/

const parseInput = (rows: string[]) => {
  const rules: Parsed = {}

  rows.forEach(row => {
    const [, bag, content] = row.match(/(\w+\s\w+) bags contain (.*)/) || ['', '', '']
    rules[bag] = {}

    content.split(', ').forEach(innerBag => {
      const [, count, color] = innerBag.match(rule2) || ['', '', '']

      if (Number(count) > 0 && color) {
        rules[bag][color] = Number(count)
      }
    })
  })

  return rules
}

const getAllPossibleBags = (rules: Parsed, target: string) => {
  const parents = new Set()
  const children = [target]

  for (const c of children) {
    const directParents = Object.keys(rules).filter(key => {
      return Object.keys(rules[key]).includes(c)
    })

    directParents.forEach(p => parents.add(p))
    children.push(...directParents)
  }

  return [...parents]
}

const stage1 = () => {
  const rules = parseInput(rows)
  return getAllPossibleBags(rules, 'shiny gold').length
}

const stage2 = () => {
  const rules = parseInput(rows)
  const nestedBags = ['shiny gold']

  for (const bag of nestedBags) {
    Object.keys(rules[bag]).forEach(color => {
      for (let x = 0; x < rules[bag][color]; x++) {
        nestedBags.push(color)
      }
    })
  }

  return nestedBags.length - 1
}

// console.log(stage1())
console.log(stage2())