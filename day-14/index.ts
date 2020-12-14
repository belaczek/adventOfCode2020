const input = Deno.readTextFileSync("./day-14/input.txt")
const rows: string[] = input.split('\n')

const memTest = new RegExp(/\[(\d+)\]/)

const applyMask = (mask: string, value: number) => {
  let res = 0n
  const binVal = value.toString(2)

  // console.log({ mask, value, binVal })

  for (let i = 0; i < mask.length; i++) {
    const x = mask.length - binVal.length

    res <<= 1n

    switch (mask[i]) {
      case "X":
        if (Number(binVal[i - x])) {
          res |= 1n
        }
        break;
      case "1":
        res |= 1n
        break;
    }
    // console.log({ i, x, val: binVal[i - x], mask: mask[i], res })
  }

  if(res < 0){
    console.log({ mask, value, binVal, res })
  }

  return res
}


const test = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`

const stage1 = () => {
  let mask: string
  const mem: bigint[] = []

  rows.forEach((row) => {
    if (row.startsWith('mask')) {
      mask = row.split(' ')[2]
      return
    }

    const [targetMem, , value] = row.split(' ')
    const [, memPointer] = memTest.exec(targetMem)!

    mem[Number(memPointer)] = applyMask(mask, Number(value))
  })

  return mem.filter(Boolean).reduce((a, b) => a + b, 0n)
}


console.log(stage1())