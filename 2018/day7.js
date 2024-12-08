//AOC2018 D7

function parse(s) {
    let arr = s.split('\n').map(l => {
        return l.match(/ ([A-Z])/g).map(s => s.trim());
    });
    let all =  new Set([...arr.flat()]);
    let map = {};
    [...all].forEach(n => {
        map[n] = arr.filter(([n1, n2]) => n2 === n).map(a => a[0]);
    });
    return map;
}

function print(map) {
    let list = Object.entries(map);
    let ready = new Set();
    while(true) {
        let _list = list
            .filter(([n, req]) => !ready.has(n) && req.every(_n => ready.has(_n)))
            .map(a => a[0]).sort();
        if(!_list.length) {
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
    while(true) {
        working = working.map(w => {
            let t = w.time - 1;
            if(t === 0) ready.add(w.step);
            return { step:w.step, time: t };
        }).filter(w => w.time !== 0);
        
        let _list = list
            .filter(([n, req]) => !ready.has(n) && req.every(_n => ready.has(_n)))
            .map(a => a[0]).sort();

        if(!_list.length) {
            break;
        }
        
        _list = _list.filter(n => !working.find(w => w.step === n));
        let i = 0;
        while(working.length < 5 && _list.length > 0) {
            let n = _list.shift();
            working.push({ step:n, time: getTime(n, base) })
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

function data() {
    return `
Step Z must be finished before step V can begin.
Step V must be finished before step K can begin.
Step M must be finished before step Q can begin.
Step E must be finished before step X can begin.
Step J must be finished before step W can begin.
Step L must be finished before step O can begin.
Step Q must be finished before step T can begin.
Step Y must be finished before step P can begin.
Step X must be finished before step R can begin.
Step T must be finished before step U can begin.
Step I must be finished before step O can begin.
Step P must be finished before step H can begin.
Step G must be finished before step A can begin.
Step N must be finished before step A can begin.
Step H must be finished before step B can begin.
Step F must be finished before step D can begin.
Step S must be finished before step O can begin.
Step O must be finished before step W can begin.
Step D must be finished before step U can begin.
Step W must be finished before step B can begin.
Step A must be finished before step K can begin.
Step B must be finished before step R can begin.
Step K must be finished before step C can begin.
Step R must be finished before step C can begin.
Step U must be finished before step C can begin.
Step A must be finished before step U can begin.
Step J must be finished before step I can begin.
Step D must be finished before step K can begin.
Step V must be finished before step S can begin.
Step H must be finished before step C can begin.
Step R must be finished before step U can begin.
Step I must be finished before step G can begin.
Step D must be finished before step R can begin.
Step M must be finished before step B can begin.
Step G must be finished before step R can begin.
Step M must be finished before step I can begin.
Step G must be finished before step N can begin.
Step M must be finished before step N can begin.
Step Q must be finished before step S can begin.
Step I must be finished before step S can begin.
Step J must be finished before step R can begin.
Step O must be finished before step B can begin.
Step G must be finished before step S can begin.
Step J must be finished before step C can begin.
Step M must be finished before step D can begin.
Step T must be finished before step H can begin.
Step P must be finished before step N can begin.
Step S must be finished before step K can begin.
Step T must be finished before step C can begin.
Step J must be finished before step A can begin.
Step G must be finished before step F can begin.
Step N must be finished before step R can begin.
Step N must be finished before step W can begin.
Step T must be finished before step I can begin.
Step S must be finished before step B can begin.
Step H must be finished before step F can begin.
Step B must be finished before step C can begin.
Step L must be finished before step W can begin.
Step N must be finished before step O can begin.
Step O must be finished before step A can begin.
Step H must be finished before step S can begin.
Step F must be finished before step A can begin.
Step F must be finished before step C can begin.
Step M must be finished before step A can begin.
Step Z must be finished before step H can begin.
Step Z must be finished before step L can begin.
Step E must be finished before step H can begin.
Step X must be finished before step T can begin.
Step Y must be finished before step X can begin.
Step E must be finished before step W can begin.
Step P must be finished before step R can begin.
Step Z must be finished before step E can begin.
Step W must be finished before step C can begin.
Step I must be finished before step P can begin.
Step X must be finished before step A can begin.
Step Y must be finished before step C can begin.
Step I must be finished before step F can begin.
Step L must be finished before step T can begin.
Step A must be finished before step B can begin.
Step F must be finished before step W can begin.
Step T must be finished before step R can begin.
Step X must be finished before step F can begin.
Step M must be finished before step O can begin.
Step N must be finished before step K can begin.
Step T must be finished before step S can begin.
Step J must be finished before step N can begin.
Step J must be finished before step S can begin.
Step O must be finished before step D can begin.
Step T must be finished before step P can begin.
Step Z must be finished before step D can begin.
Step L must be finished before step X can begin.
Step Q must be finished before step G can begin.
Step M must be finished before step G can begin.
Step P must be finished before step W can begin.
Step V must be finished before step P can begin.
Step D must be finished before step B can begin.
Step Y must be finished before step D can begin.
Step X must be finished before step S can begin.
Step K must be finished before step U can begin.
Step Z must be finished before step Y can begin.
Step D must be finished before step W can begin.
    `.trim();
}
