import data from './day8_input.ts';
// import data from './day8_sample.ts';

interface Entry {
    patterns: string[];
    outputs: string[];
}

function toEntry(s: string): Entry {
    let [patterns, outputs] = s
        .split(/\s*\|\s*/)
        .map((s) => s.split(/\s+/).map((s) => s.split('').sort().join('')));
    return { patterns, outputs };
}

let arr = data().trim().split('\n').map(toEntry);

console.log(
    'Part 1',
    arr.flatMap((e) => e.outputs.filter((s) => [2, 4, 3, 7].includes(s.length)))
        .length
);

const substractLen = (s1: string[], s2: string[]) =>
    s1.filter((c) => !s2.includes(c)).length;

const patternsArrByLen = (patterns: string[], len: number) =>
    patterns.filter((p) => p.length === len).map((e) => e.split(''));

const getPatternNumberMap = (patterns: string[]) => {
    let D1 = patternsArrByLen(patterns, 2)[0];
    let D4 = patternsArrByLen(patterns, 4)[0];
    let D7 = patternsArrByLen(patterns, 3)[0];
    let D8 = patternsArrByLen(patterns, 7)[0];

    let M6 = Object.fromEntries(
        patternsArrByLen(patterns, 6).map((p) => {
            let d = 0;
            if (substractLen(p, D1) === 5) d = 6;
            else if (substractLen(p, D4) === 2) d = 9;
            return [p.join(''), d];
        })
    );

    let M5 = Object.fromEntries(
        patternsArrByLen(patterns, 5).map((p) => {
            let d = 5;
            if (substractLen(p, D1) === 3) d = 3;
            else if (substractLen(p, D4) === 3) d = 2;
            return [p.join(''), d];
        })
    );

    return {
        [D1.join('')]: 1,
        [D4.join('')]: 4,
        [D7.join('')]: 7,
        [D8.join('')]: 8,
        ...M6,
        ...M5
    };
};

const getOutput = (e: Entry) => {
    let { patterns, outputs } = e;
    let M = getPatternNumberMap(patterns);
    let s = outputs.map((s) => M[s]).join('');
    return parseInt(s, 10);
};

console.log(
    'Part 2',
    arr.reduce((a, e) => a + getOutput(e), 0)
);
