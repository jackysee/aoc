import data from './day7_input.ts';

interface Line {
    insides: string[];
    outsides: string[];
    s: string;
}
let arr: Line[] = data()
    .split('\n')
    .map((s) => ({
        insides: s.match(/\[[a-z]+\]/g) || [],
        outsides: s.split(/\[[a-z]+\]/),
        s
    }));

const hasABBA = (s: string) => !!/(.)(?!\1)(.)\2\1/.test(s);
console.log(
    'Part 1',
    arr.filter(
        ({ insides, outsides }) =>
            insides.every((s) => !hasABBA(s)) && outsides.some(hasABBA)
    ).length
);

const matchOverlap = (input: string, re: RegExp) => {
    var r = [];
    var m;
    while ((m = re.exec(input))) {
        re.lastIndex -= m[0].length - 1;
        r.push(m[0]);
    }
    return r;
};

console.log(
    'Part 2',
    arr.filter(({ insides, outsides }) => {
        let patterns = outsides
            .flatMap((s) => matchOverlap(s, /(.)(?!\1)(.)\1/g))
            .map((s) => s[1] + s[0] + s[1]);
        return patterns.some((p) => insides.some((s) => s.indexOf(p) !== -1));
    }).length
);
