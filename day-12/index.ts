const input = Deno.readTextFileSync("./day-12/input.txt")
const rows: string[] = input.split('\n')

type Direction = 'N' | 'S' | 'E' | 'W'

type Action = Direction | 'L' | 'R' | 'F'

const directionDegrees: Record<Direction, number> = {
  N: 0,
  E: 90,
  S: 180,
  W: 270
}

const directions: Direction[] = ['E', "N", "W", "S"]

class Ship {
  coordinates = [0, 0]
  angle = 90

  get direction(): Direction {
    return (Object.keys(directionDegrees) as Direction[]).find(key => directionDegrees[key] === this.angle % 360)!
  }
  // direction: Direction = 'E'

  private turn(degrees: number) {
    console.log(`Turning ${degrees} degrees from ${this.direction}`)
    this.angle += degrees
    console.log(`to ${this.direction}`)

  }



  private move(distance: number, direction: Direction = this.direction) {
    let [x, y] = this.coordinates
    console.log(`Moving ${distance} distance to ${direction} `)
    switch (direction) {
      case 'N':
        y += distance
        break;
      case 'E':
        x += distance
        break;
      case 'S':
        y -= distance
        break;
      case 'W':
        x -= distance
        break;
    }

    this.coordinates = [x, y]
  }

  process(instruction: string) {
    const action = instruction[0] as Action
    const value = Number(instruction.substring(1))

    switch (action) {
      case "N":
      case "E":
      case "S":
      case "W":
        this.move(value, action)
        break;
      case "F":

        // const direction = directions[(this.angle / 90) % 4]
        // const direction = dire[(this.angle / 90) % 4]
        this.move(value)
        break;
      case "L":
        this.turn(360 - value)
        break;
      case "R":
        this.turn(value)
        break;
    }
  }

}

const test = `F10
N3
F7
R90
F11`.split("\n")

const stage1 = () => {
  const ship = new Ship()
  rows.forEach(instruction => ship.process(instruction))

  const [x, y] = ship.coordinates

  return `x: ${x}, y: ${y}, total: ${Math.abs(x) + Math.abs(y)}`
}


class Waypoint {
  wx = 10
  wy = 1


  set(direction: Direction, distance: number) {
    switch (direction) {
      case 'N':
        this.wy += distance
        break;
      case 'E':
        this.wx += distance
        break;
      case 'S':
        this.wy -= distance
        break;
      case 'W':
        this.wx -= distance
        break;
    }
  }

  turn(degrees: number) {
    let x
    switch (degrees) {
      case 90:
        x = this.wx
        this.wx = this.wy
        this.wy = -x
        break;
      case 180:
        this.wx = -this.wx
        this.wy = -this.wy
        break;
      case 270:
        x = this.wx
        this.wx = -this.wy
        this.wy = x
        break;
    }
  }

}


class Ship2 {
  coordinates = [0, 0]

  waypoint = new Waypoint()

  move(times: number) {
    let [x, y] = this.coordinates
    const { wx, wy } = this.waypoint

    x += wx * times
    y += wy * times

    this.coordinates = [x, y]
  }

  process(instruction: string) {
    const action = instruction[0] as Action
    const value = Number(instruction.substring(1))

    switch (action) {
      case "N":
      case "E":
      case "S":
      case "W":
        this.waypoint.set(action, value)
        // this.move(value, action)
        break;
      case "F":

        // const direction = directions[(this.angle / 90) % 4]
        // const direction = dire[(this.angle / 90) % 4]
        this.move(value)
        break;
      case "L":
        this.waypoint.turn(360 - value)
        // this.waypoint.turn(360 - value)
        break;
      case "R":
        this.waypoint.turn(value)
        break;
    }
  }

}


const stage2 = () => {
  const ship = new Ship2()

  rows.forEach(instruction => ship.process(instruction))

  const [x, y] = ship.coordinates

  return `x: ${x}, y: ${y}, total: ${Math.abs(x) + Math.abs(y)}`
}

console.log(stage2())