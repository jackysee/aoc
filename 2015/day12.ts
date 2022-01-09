import data from './day12_input.ts';
// import data from './day12_sample.ts';

let d = JSON.parse(data());

function collect(d: any, ignoreRed: boolean = false): number {
    if (ignoreRed && !Array.isArray(d) && Object.values(d).includes('red'))
        return 0;
    return Object.values(d).reduce((a: number, c: any) => {
        if (typeof c === 'number') return a + c;
        if (typeof c === 'object') return a + collect(c, ignoreRed);
        return a;
    }, 0);
}

console.log('Part 1', collect(d));
console.log('Part 2', collect(d, true));
