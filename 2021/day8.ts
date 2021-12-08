import data from './day8_input.ts';
// import data from './day8_sample.ts';
//

interface Entry {
    patterns: string[];
    outputs: string[];
}
function toEntry(s: string) {
    let [patterns, outputs] = s.split(/\s*\|\s*/).map((s) => {
        let r = s.split(/\s+/);
        return r;
    });
    return { patterns, outputs };
}

let arr: Entry[] = data().trim().split('\n').map(toEntry);

const segmentLength = [2, 4, 3, 7]; //correspond to 1,4,7,8
console.log(
    'Part 1',
    arr.reduce((a, e) => {
        return (
            a + e.outputs.filter((s) => segmentLength.includes(s.length)).length
        );
    }, 0)
);

const diff = (p1: string[], p2: string[]) => {
    let r: string[] = [];
    p1.forEach((l) => {
        if (!p2.includes(l)) r.push(l);
    });
    p2.forEach((l) => {
        if (!p1.includes(l)) r.push(l);
    });
    return r;
};

const remove = (L: string[][], D: string[]) => {
    return L.filter((p) => p.join('') !== D.join(''));
};

const sortStr = (s: string) => {
    return s.split('').sort().join('');
};

const getPatternNumberMap = (patterns: string[]) => {
    let L = patterns.reduce((a: { [key: number]: string[][] }, e) => {
        a[e.length] = a[e.length] || [];
        a[e.length].push(sortStr(e).split(''));
        return a;
    }, {});

    let M = Object.fromEntries(
        patterns.map((_e) => {
            let e = sortStr(_e);
            if (e.length === 2) return [e, 1];
            else if (e.length === 4) return [e, 4];
            else if (e.length === 3) return [e, 7];
            else if (e.length === 7) return [e, 8];
            else return [e, undefined];
        })
    );

    //segment
    let S: { [key: string]: string } = {};

    /* L6 not contains D1 is 6 */
    let D6 = L[6].find((p) => !L[2][0].every((c) => p.includes(c))) || [];
    L[6] = remove(L[6], D6);

    /* D1 not in D6 is R1 */
    S.R1 = L[2][0].filter((c) => !D6.includes(c))[0];

    /* D1 diff [R1] = R2 */
    S.R2 = diff(L[2][0], [S.R1])[0];

    /* L5 no R2 is 2 */
    let D2 = L[5].find((p) => !p.includes(S.R2)) || [];
    L[5] = remove(L[5], D2);

    /* D4 diff [...D2, R2] = L1 */
    S.L1 = diff(L[4][0], [...D2, S.R2])[0];

    /* L5 filter D2 has L1 = 5 */
    let D5 = L[5].filter((p) => p.includes(S.L1))[0];

    /* L5 only one left is 3 */
    let D3 = remove(L[5], D5)[0];

    /* D2 - D3 = L2 */
    S.L2 = D2.filter((c) => !D3.includes(c))[0];

    /* L6 no L2 = 9 */
    let D9 = L[6].filter((p) => !p.includes(S.L2))[0];

    /* the remaining one is 0 */
    let D0 = remove(L[6], D9)[0];

    M[D6.sort().join('')] = 6;
    M[D2.sort().join('')] = 2;
    M[D5.sort().join('')] = 5;
    M[D3.sort().join('')] = 3;
    M[D9.sort().join('')] = 9;
    M[D0.sort().join('')] = 0;
    return M;
};

const getOutput = (e: Entry) => {
    let { patterns, outputs } = e;
    let M = getPatternNumberMap(patterns);
    let s = outputs.map((s) => M[s.split('').sort().join('')]).join('');
    return parseInt(s, 10);
};

// let sample = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;
// let e = toEntry(sample);
// console.log(getOutput(toEntry(sample)));

console.log(
    'Part 2',
    arr.reduce((a, e) => a + getOutput(e), 0)
);
