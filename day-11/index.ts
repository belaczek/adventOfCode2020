import isEqual from 'https://cdn.skypack.dev/lodash.isequal';

const input = Deno.readTextFileSync("./day-11/input.txt")

type PosType = 'L' | '.' | '#'
const rows: PosType[][] = input.split('\n').map(row => row.split('')) as PosType[][]

const getAdjacentCount = (generation: PosType[][], [posx, posy]: [number, number], target: PosType) => {
  let count = generation
    .slice(Math.max(posy - 1, 0), posy + 2)
    .flatMap(row => row.slice(Math.max(posx - 1, 0), posx + 2))
    .filter(val => val === target).length

  if (generation[posy][posx] === target) {
    count--
  }

  return count
}


const runGeneration = (prev: PosType[][]) => {
  const newGen: PosType[][] = []

  prev.forEach((row, posy) => {
    const newRow: PosType[] = []
    newGen.push(newRow)

    row.forEach((value, posx) => {
      switch (value) {
        case 'L':
          if (getAdjacentCount(prev, [posx, posy], '#') === 0) {
            newRow.push('#')
          } else {
            newRow.push('L')
          }
          break;
        case '.':
          newRow.push('.')
          break;
        case '#':
          if (getAdjacentCount(prev, [posx, posy], '#') >= 4) {
            newRow.push('L')
          } else {
            newRow.push('#')
          }
          break;
        default:
          throw new Error('unknown field')
          break;
      }
    })
  })

  return newGen
}



const stage1 = () => {
  const generations: PosType[][][] = [rows]

  let shouldRun = true

  while (shouldRun) {
    const lastGen = generations[generations.length - 1]
    const newGen = runGeneration(lastGen)
    if (isEqual(lastGen, newGen)) {
      shouldRun = false
    } else {
      generations.push(newGen)
    }
  }

  const lastGen = generations[generations.length - 1]

  const occupied = lastGen.flatMap(row => row).filter(v => v === '#').length

  return [generations.length, occupied]
}


const checkDirection = (generation: PosType[][], [posx, posy]: [number, number], [dirx, diry]: [number, number]): boolean => {
  const current = generation[posy]? generation[posy][posx]: undefined
  switch (current) {
    case '#':
      return true
    case 'L':
      return false
    case '.':
      return checkDirection(generation, [posx + dirx, posy + diry], [dirx, diry])
    default:
      return false
  }

}


const getOccupied = (generation: PosType[][], [posx, posy]: [number, number]) => {

  const directions: Array<[number, number]> = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]

  return directions.map(dirs => checkDirection(generation, [posx + dirs[0], posy + dirs[1]], dirs)).filter(Boolean).length
}



const runGeneration2 = (prev: PosType[][]) => {
  const newGen: PosType[][] = []

  prev.forEach((row, posy) => {
    const newRow: PosType[] = []
    newGen.push(newRow)

    row.forEach((value, posx) => {
      switch (value) {
        case 'L':
          if (getOccupied(prev, [posx, posy]) === 0) {
            newRow.push('#')
          } else {
            newRow.push('L')
          }
          break;
        case '.':
          newRow.push('.')
          break;
        case '#':
          if (getOccupied(prev, [posx, posy]) >= 5) {
            newRow.push('L')
          } else {
            newRow.push('#')
          }
          break;
        default:
          throw new Error('unknown field')
          break;
      }
    })
  })

  return newGen
}

const stage2 = () => {
  const generations: PosType[][][] = [rows]

  let shouldRun = true

  while (shouldRun) {
    const lastGen = generations[generations.length - 1]
    const newGen = runGeneration2(lastGen)
    if (isEqual(lastGen, newGen)) {
      shouldRun = false
    } else {
      generations.push(newGen)
    }
  }

  const lastGen = generations[generations.length - 1]

  const occupied = lastGen.flatMap(row => row).filter(v => v === '#').length

  return [generations.length, occupied]
}



console.log(stage2())