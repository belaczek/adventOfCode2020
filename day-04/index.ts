const input = Deno.readTextFileSync("./day-04/input.txt")

type Key =
  | "byr"
  | "iyr"
  | "eyr"
  | "hgt"
  | "hcl"
  | "ecl"
  | "pid"
  | "cid"


interface Validator {
  key: Key,
  validate: (input?: string | undefined) => boolean
}

const fourDigitExp = new RegExp(/^\d\d\d\d$/)

const validators: Validator[] = [
  {
    key: 'byr', validate: (input) => {
      return Boolean(input && fourDigitExp.test(input) && Number(input) >= 1920 && Number(input) <= 2002)
    }
  },
  {
    key: "iyr", validate: (input) => {
      return Boolean(input && fourDigitExp.test(input) && Number(input) >= 2010 && Number(input) <= 2020)
    }
  },
  {
    key: "eyr", validate: (input) => {
      return Boolean(input && fourDigitExp.test(input) && Number(input) >= 2020 && Number(input) <= 2030)
    }
  },
  {
    key: "hgt", validate: (input) => {
      if (!input) {
        return false
      }

      if (!new RegExp(/^\d+(cm|in)$/).test(input)) {
        return false
      }

      const value = Number(input.substr(0, input.length - 2))
      const unit = input.substr(input.length - 2, input.length)

      if (unit === 'cm') {
        return value >= 150 && value <= 193
      }
      return value >= 59 && value <= 76
    }
  },
  {
    key: "hcl", validate: (input) => {
      return !!input && new RegExp(/^#(?:[0-9a-fA-F]{6})$/).test(input)
    }
  },
  {
    key: "ecl", validate: (input) => {
      return !!input && ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(input)
    }
  },
  {
    key: "pid", validate: (input) => {
      return !!input && new RegExp(/^\d{9}$/).test(input)
    }
  },
  {
    key: "cid", validate: (input) => {
      return true
    }
  },
]

const validate = (validators: Validator[]) => (target: Record<Key, string>) => {
  return validators.reduce((isValid, validator) =>
    isValid && validator.validate(target[validator.key])
    , true)
}

const parseInputRecord = (input: string) => {
  const entries = input.split(/\s+/).map(r => r.split(':'))

  const obj: Record<string, string> = {}

  entries.forEach(([key, value]) => {
    obj[key] = value
  })

  return obj as Record<Key, string>
}

const res = input
  .split('\n\n')
  .map(parseInputRecord)
  .filter(validate(validators))
  .length

console.log(res)