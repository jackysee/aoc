import data from './day10_input.ts';
// import data from './day10_sample.ts';

let bots:Record<number, number[]> = {};
let outputs:Record<number, number[]> = {};
data().split('\n').forEach(l => {
    let [a,b,c] = l.match(/\d+/g)!.map(Number);
    if(l.startsWith('value')) {
        bots[b] = [...(bots[b] || []), a];
    }
});

