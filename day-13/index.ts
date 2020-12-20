const input = Deno.readTextFileSync("./day-13/input.txt")
const [timestamp, timetable]: string[] = input.split('\n')

const stage1 = () => {
  const ts = Number(timestamp)
  const buses = timetable.split(',').filter(n => n !== 'x').map(id => {
    const nid = Number(id)
    const diff = ts % Number(id)
    return ({
      id: nid,
      diff: diff === 0 ? ts : nid - diff,
      bla: ts / nid
    })
  }).sort((a, b) => a.diff - b.diff)

  return buses
}

const test = `67,7,59,61`


/**
 * Extended greatest common divisor
 * Euclid's algorithm
 *
 * @param a paired with x in output
 * @param b paired with y in output
 */
const egcd = (a: bigint, b: bigint) => {
  let x = 1n;
  let y = 0n;
  let r = 0n;
  let s = 1n;

  while (b !== 0n) {
    let c = a % b;
    let q = a / b;
    a = b;
    b = c;

    let rPrim = r;
    let sPrim = s;
    r = x - q * r;
    s = y - q * s;
    x = rPrim;
    y = sPrim;
  }

  return { a, x, y };
};

/**
 * Modulo
 *
 * @param a base
 * @param b modulus
 */
const mod = (a: bigint, b: bigint) => {
  const x = a % b;
  return x < 0n ? x + b : x;
};

/**
 * Congruences solution - Chinese remainder theorem
 *
 * Solves x for:
 * x mod modulus1 = remainder1
 * x mod modulus2 = remainder2
 * ...
 * x mod modulusN = remainderN
 *
 * @param congruences [modulus, remainder][]
 */
const crt = (congruences: [bigint, bigint][]) => {
  return mod(
    congruences
      .map(([modulus, remainder]) => {
        const N = congruences
          .filter(([currBus]) => currBus !== modulus)
          .reduce((acc, [modulus]) => acc * modulus, 1n);
        return remainder * N * egcd(N, modulus).x;
      })
      .reduce((a, b) => a + b),
    congruences.reduce((acc, [modulus]) => acc * modulus, 1n)
  );
};

/** Stage 2 is not my own solution, copied from https://github.com/caderek/aoc2020/tree/main/src/day13  */
const stage2 = () => {
   const buses = timetable
    .split(",")
    .map((val, i) => [val, i])
    .filter(([val]) => val !== "x")
    .map(([val, i]) => {
      const bus = BigInt(val);
      return [bus, i === 0 ? 0n : bus - (BigInt(i) % bus)];
    });

  return String(crt(buses as [bigint, bigint][]));
}

console.log(stage2())