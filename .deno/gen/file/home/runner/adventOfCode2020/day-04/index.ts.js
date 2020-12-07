"use strict";
const input = Deno.readTextFileSync("./day-04/input.txt");
const fourDigitExp = new RegExp(/^\d\d\d\d$/);
const validators = [
    {
        key: 'byr', validate: (input) => {
            return Boolean(input && fourDigitExp.test(input) && Number(input) >= 1920 && Number(input) <= 2002);
        }
    },
    {
        key: "iyr", validate: (input) => {
            return Boolean(input && fourDigitExp.test(input) && Number(input) >= 2010 && Number(input) <= 2020);
        }
    },
    {
        key: "eyr", validate: (input) => {
            return Boolean(input && fourDigitExp.test(input) && Number(input) >= 2020 && Number(input) <= 2030);
        }
    },
    {
        key: "hgt", validate: (input) => {
            if (!input) {
                return false;
            }
            if (!new RegExp(/^\d+(cm|in)$/).test(input)) {
                return false;
            }
            const value = Number(input.substr(0, input.length - 2));
            const unit = input.substr(input.length - 2, input.length);
            if (unit === 'cm') {
                return value >= 150 && value <= 193;
            }
            return value >= 59 && value <= 76;
        }
    },
    {
        key: "hcl", validate: (input) => {
            return !!input && new RegExp(/^#(?:[0-9a-fA-F]{6})$/).test(input);
        }
    },
    {
        key: "ecl", validate: (input) => {
            return !!input && ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(input);
        }
    },
    {
        key: "pid", validate: (input) => {
            return !!input;
        }
    },
    {
        key: "cid", validate: (input) => {
            return true;
        }
    },
];
const validate = (validators) => (target) => {
    return validators.reduce((isValid, validator) => isValid && validator.validate(target[validator.key]), true);
};
const parseInputRecord = (input) => {
    const entries = input.split(/\s+/).map(r => r.split(':'));
    const obj = {};
    entries.forEach(([key, value]) => {
        obj[key] = value;
    });
    return obj;
};
// const parse
const res = input
    .split('\n\n')
    .map(parseInputRecord)
    .filter(validate(validators))
    .length;
// .map(s => s.split(/\s+/).map(r => r.split(':')))
// .filter(rec => {
//   const keys = rec.map(([first]) => first)
//   return required.every(req => keys.includes(req))
// })
// .length
console.log(res);
//# sourceMappingURL=file:///home/runner/adventOfCode2020/.deno/gen/file/home/runner/adventOfCode2020/day-04/index.ts.js.map