//AOC2018 D7
import data from './day7_input.js';

function parse(s) {
    let arr = s.split('\n').map((l) => {
        return l.match(/ ([A-Z])/g).map((s) => s.trim());
    });
    let all = new Set([...arr.flat()]);
    let map = {};
    [...all].forEach((n) => {
        map[n] = arr.filter(([n1, n2]) => n2 === n).map((a) => a[0]);
    });
    return map;
}

function print(map) {
    let list = Object.entries(map);
    let ready = new Set();
    while (true) {
        let _list = list
            .filter(
                ([n, req]) => !ready.has(n) && req.every((_n) => ready.has(_n))
            )
            .map((a) => a[0])
            .sort();
        if (!_list.length) {
            break;
        }
        ready.add(_list[0]);
    }
    return [...ready].join('');
}

function getTime(n, base) {
    return base + n.charCodeAt(0) - 64;
}

function work(map, workers = 5, base = 60) {
    let list = Object.entries(map);
    let working = [];
    let ready = new Set();
    let t = 0;
    while (true) {
        working = working
            .map((w) => {
                let t = w.time - 1;
                if (t === 0) ready.add(w.step);
                return { step: w.step, time: t };
            })
            .filter((w) => w.time !== 0);

        let _list = list
            .filter(
                ([n, req]) => !ready.has(n) && req.every((_n) => ready.has(_n))
            )
            .map((a) => a[0])
            .sort();

        if (!_list.length) {
            break;
        }

        _list = _list.filter((n) => !working.find((w) => w.step === n));
        let i = 0;
        while (working.length < 5 && _list.length > 0) {
            let n = _list.shift();
            working.push({ step: n, time: getTime(n, base) });
        }
        t++;
    }
    return [[...ready].join(''), t];
}

// console.log(parse(data()));
// console.log(print(parse(sample())));
// console.log(work(parse(sample()), 2, 0));

console.log(print(parse(data())));
console.log(work(parse(data()))); //1133

function sample() {
    return `
Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.
    `.trim();
}
