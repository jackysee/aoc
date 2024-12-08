import data from './day19_input.ts';
// import data from './day19_sample.ts';

let [r, input] = data().split('\n\n');
let replacements = r.split('\n').map((l) => l.split(' => '));

function findAllReplacements(s: string) {
    let results = replacements.flatMap(([from, to]) => {
        let m = input.matchAll(new RegExp(from, 'g'));
        let indexes = [...m].map((_) => _.index);
        return indexes.map(
            (i) => s.slice(0, i) + to + s.slice(i! + from.length)
        );
    });
    return [...new Set(results)];
}
console.log('Part 1', findAllReplacements(input).length);

replacements = replacements
    .map(([a, b]) => [b, a])
    .sort((a, b) => b[0].length - a[0].length);
let current = input;
let step = 0;
while (true) {
    if (current === 'e') {
        console.log('Part 2', step);
        break;
    }
    let r = replacements.find((r) => current.indexOf(r[0]) !== -1);
    if (r) current = current.replace(new RegExp(r[0]), r[1]);
    step++;
}
