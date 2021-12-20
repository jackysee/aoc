import data from './day19_input.ts';
// import data from './day19_sample.ts';

let scanners = data()
    .trim()
    .split('\n\n')
    .map((s) => {
        let lines = s.split('\n');
        let id = Number(lines[0].match(/\d+/));
        let signals = lines.slice(1).map((s: string) => s.split(','));
        return { id, signals };
    });

console.log(scanners);

console.log(scanners.map((s) => s.signals.length));
