"use strict";
const input = Deno.readTextFileSync("./day-16/input.txt");
const [rulesInput, myTicketInput, nearbyTicketsInput] = input.split('\n\n');
const stage1 = (rulesInput, nearbyTicketsInput) => {
    const nearbyTickets = nearbyTicketsInput.split("\n").slice(1).map(x => x.split(',').map(n => Number(n)));
    const rules = new Map();
    rulesInput.split('\n').forEach(row => {
        const [name, rulesInput] = row.split(':');
        const tests = rulesInput.split("or").map(range => range.split('-').map(n => Number(n)));
        console.log(tests);
        const test = (val) => {
            return tests.some(([min, max]) => (val >= min) && (val <= max));
        };
        rules.set(name, test);
    });
    let invalids = [];
    nearbyTickets.forEach(t => {
        t.forEach(value => {
            let isValid = false;
            rules.forEach(test => {
                isValid = isValid || test(value);
            });
            if (!isValid) {
                invalids.push(value);
            }
        });
    });
    return invalids.reduce((a, b) => a + b);
};
const testRules = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50`;
const testTickets = `nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;
// console.log(stage1(testRules, testTickets))
// console.log(stage1(rulesInput, nearbyTicketsInput))
const calculateIndex = (rules, tickets) => {
    rules.forEach((rule, key) => {
        // const i = cleanedTickets[0].findIndex((val, i) => {
        //   return cleanedTickets.every(row => rule.test(row[i]))
        // })
        rule.index = [];
        const finalIdxs = Array.from(rules.values()).map(r => r.finalIndex);
        for (let x = 0; x < 20; x++) {
            if (!finalIdxs.includes(x) && tickets.every(row => rule.test(row[x]))) {
                rule.index.push(x);
            }
        }
    });
};
const stage2 = (rulesInput, nearbyTicketsInput) => {
    const nearbyTickets = nearbyTicketsInput.split("\n").slice(1).map(x => x.split(',').map(n => Number(n)));
    const rules = new Map();
    rulesInput.split('\n').forEach(row => {
        const [name, rulesInput] = row.split(':');
        const tests = rulesInput.split("or").map(range => range.split('-').map(n => Number(n)));
        // console.log(tests)
        const test = (val) => {
            return tests.some(([min, max]) => (val >= min) && (val <= max));
        };
        rules.set(name, { test, index: [] });
    });
    const cleanedTickets = nearbyTickets.filter(t => {
        return t.every(value => {
            let isValid = false;
            rules.forEach(test => {
                isValid = isValid || test.test(value);
            });
            return isValid;
        });
    });
    let finished = false;
    while (!finished) {
        calculateIndex(rules, cleanedTickets);
        let isDone = true;
        rules.forEach(rule => {
            if (rule.index.length === 1) {
                rule.finalIndex = rule.index[0];
            }
            isDone = isDone && rule.finalIndex !== undefined;
        });
        finished = isDone;
    }
    const myTicket = myTicketInput.split("\n")[1].split(',').map(n => Number(n));
    // rules.forEach((rule, key) => {
    //   // const i = cleanedTickets[0].findIndex((val, i) => {
    //   //   return cleanedTickets.every(row => rule.test(row[i]))
    //   // })
    //   for (let x = 0; x < 20; x++) {
    //     if (cleanedTickets.every(row => rule.test(row[x]))) {
    //       rule.index.push(x)
    //     }
    //   }
    // })
    // return [cleanedTickets.length, nearbyTickets.length]
    return myTicket.filter((val, i) => {
        let valid = false;
        rules.forEach((value, key) => {
            if (key.startsWith('departure') && value.finalIndex === i) {
                valid = true;
            }
        });
        return valid;
    }).reduce((a, b) => a * b, 1);
};
console.log(stage2(rulesInput, nearbyTicketsInput));
//# sourceMappingURL=file:///home/runner/adventOfCode2020/.deno/gen/file/home/runner/adventOfCode2020/day-16/index.ts.js.map