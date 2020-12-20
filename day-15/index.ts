

const stage1 = () => {
  const input = [20, 9, 11, 0, 1, 2]

  let i = input.length - 1

  for (i; i < (2020 - 1); i++) {
    const current = input[i]
    const previous = input
      .slice(0, i)
      .map((value, index) => ([value, index]))
      .filter(([val]) => val === current)

    if (previous.length) {
      const [value, lastIndex] = previous[previous.length - 1]
      // console.log({value, lastIndex, i, previous, input})
      input.push(i - lastIndex)
    } else {
      // console.log({value: current, lastIndex: 0, i})
      input.push(0)
    }
  }

  return input[i]
}

// console.log(stage1())

const stage2 = (input: number[], repeatTimes: number) => {
  const spoken = new Map()

  input.forEach((val, i) => { spoken.set(val, i) })

  let prev = input[input.length - 1]
  spoken.delete(prev)

  for (let i = input.length - 1; i < (repeatTimes - 1); i++) {
    const lastIndex = spoken.get(prev)
    let newVal = 0

    if (lastIndex !== undefined) {
      newVal = i - lastIndex
    }

    spoken.set(prev, i)
    prev = newVal

    if (i % 3000 === 0) {
      console.clear()
      console.log(Math.round(i / repeatTimes * 100) + ' %')
    }
  }


  return prev
}



console.log(stage2([20, 9, 11, 0, 1, 2], 30000000))
// console.log(stage2([0, 3, 6], 30000000))