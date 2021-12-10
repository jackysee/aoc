import data from './day10_input.ts';
// import data from './day10_sample.ts';

let arr: Array<string> = data().split('\n');

const brackets: { [key: string]: string } = {
    '{': '}',
    '[': ']',
    '(': ')',
    '<': '>'
};
const openBrackets = Object.keys(brackets);
const closeBrackets = Object.values(brackets);
const parsedLines = arr.map((line) => {
    var stack: string[] = [];
    let illegal = line.split('').find((c) => {
        if (openBrackets.includes(c)) {
            stack.push(c);
        } else if (closeBrackets.includes(c)) {
            let b = stack.pop();
            if (b && brackets[b] !== c) {
                return true;
            }
        }
    });
    return { illegal, stack };
});

const illegalScoreMap: { [key: string]: number } = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
};
console.log(
    'Part 1',
    parsedLines.reduce((a, c) => a + (illegalScoreMap[c.illegal || ''] || 0), 0)
);

const autoCompleteScoreMap: { [key: string]: number } = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
};
const autoCompleteScores = parsedLines
    .filter((l) => !l.illegal)
    .map((l) => {
        let score = 0;
        while (l.stack.length) {
            let c = l.stack.pop();
            score = score * 5 + autoCompleteScoreMap[brackets[c || '']] || 0;
        }
        return score;
    })
    .sort((a, b) => a - b);

console.log(
    'Part 2',
    autoCompleteScores[Math.floor(autoCompleteScores.length / 2)]
);
