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

  if (res < 0) {
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


const getPointers = (mask: string, value: bigint): bigint[] => {
  const output: bigint[] = []



  for (let y = 0; y < mask.length; y++) {
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

  }

  let binVal: (string | undefined)[] = value.toString(2).split('')
  // let res = [...binVal]
  let x = mask.length - binVal.length

  for (let y = 0; y < mask.length; y++) {
    const binIndex = y - x
    if (mask[y] === 'X' && (binVal[binIndex] !== undefined)) {

      let newMask = mask.split('')
      newMask[y] = binVal[binIndex] as string

      let val1: any = [...binVal]
      let val2: any = [...binVal]
      val1[binIndex] = '1'
      val2[binIndex] = '0'
      val1 = BigInt(parseInt(val1.join(''), 2))
      val2 = BigInt(parseInt(val2.join(''), 2))

      output.push(...getPointers(newMask.join(''), val1), ...getPointers(newMask.join(''), val2));

      return output
    } else if (mask[y] === "1") {
      if (binIndex < 0) {
        for (let z = 0; z > binIndex; z--) {
          // res.unshift('0')
          binVal.unshift(undefined)
        }
        binVal[0] = "1"
        x = mask.length - binVal.length
      } else {
        binVal[binIndex] = "1"
      }
    }
  }

  output.push(BigInt(parseInt(binVal.map(n => n === undefined ? "0" : n).join(''), 2)))
  return output
}

const test2 = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`.split("\n")

const stage2 = () => {
  let mask: string
  const mem: bigint[] = Array.from({ length: 100 }, () => 0n)

  test2.forEach((row) => {
    if (row.startsWith('mask')) {
      mask = row.split(' ')[2]
      return
    }

    const [targetMem, , value] = row.split(' ')
    const [, memPointer] = memTest.exec(targetMem)!

    const pointers = getPointers(mask, BigInt(memPointer))
    for (const pointer of pointers) {
      console.log({ pointer, value })
      mem[Number(pointer)] = BigInt(value)
    }

  })

  console.log(mem)

  return mem.filter(Boolean).reduce((a, b) => a + b, 0n)
}


console.log(stage2())