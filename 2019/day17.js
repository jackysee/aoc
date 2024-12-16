//AOC2019 D17
import data from './day17_input.js';

const result = createProgram(data()).run();

const str = result.reduce((a, c) => a + String.fromCharCode(c), '');
console.log(str);
const map = {};
str.split('\n').forEach((l, j) => {
    l.split('').forEach((c, i) => {
        map[[i, j]] = c;
    });
});

function findNeighbors(map, k) {
    let [i, j] = toIntList(k);
    return [
        { value: map[[i - 1, j]], pos: [i - 1, j] },
        { value: map[[i + 1, j]], pos: [i + 1, j] },
        { value: map[[i, j - 1]], pos: [i, j - 1] },
        { value: map[[i, j + 1]], pos: [i, j + 1] }
    ];
}

let intersection = [];
Object.entries(map).forEach(([k, v]) => {
    if (/[#^<>v]/.test(v)) {
        if (findNeighbors(map, k).every((n) => n.value === '#')) {
            // intersection.push([k,v]);
            intersection.push(k);
        }
    }
});

//part1
// console.log(intersection);
console.log(
    intersection.reduce((a, k) => {
        let [i, j] = toIntList(k);
        return a + i * j;
    }, 0)
);

function forward([i, j], facing) {
    if (facing === 'N') j -= 1;
    if (facing === 'S') j += 1;
    if (facing === 'W') i -= 1;
    if (facing === 'E') i += 1;
    return { value: map[[i, j]], pos: [i, j] };
}

function backward([i, j], facing) {
    if (facing === 'N') j += 1;
    if (facing === 'S') j -= 1;
    if (facing === 'W') i += 1;
    if (facing === 'E') i -= 1;
    return { value: map[[i, j]], pos: [i, j] };
}

function next([i, j], facing) {
    let to = forward([i, j], facing);
    if (to.value === '#') {
        return { forward: true, pos: to.pos };
    }
    const from = backward([i, j], facing);
    let neighbors = findNeighbors(map, [i, j]).filter(
        (s) => s.value === '#' && s.pos + '' !== from.pos + ''
    );
    if (neighbors.length === 0) {
        //deadend
        return false;
    }
    if (neighbors.length !== 1) {
        throw new Error('should be at corner?');
    }
    let [ni, nj] = neighbors[0].pos;
    let turn;
    if (facing === 'N' && ni > i) return { turn: 'R', facing: 'E' };
    if (facing === 'N' && ni < i) return { turn: 'L', facing: 'W' };
    if (facing === 'S' && ni > i) return { turn: 'L', facing: 'E' };
    if (facing === 'S' && ni < i) return { turn: 'R', facing: 'W' };
    if (facing === 'E' && nj > j) return { turn: 'R', facing: 'S' };
    if (facing === 'E' && nj < j) return { turn: 'L', facing: 'N' };
    if (facing === 'W' && nj > j) return { turn: 'L', facing: 'S' };
    if (facing === 'W' && nj < j) return { turn: 'R', facing: 'N' };
}

let pos = toIntList(Object.entries(map).find(([k, v]) => /[\^<>v]/.test(v))[0]);
// console.log({pos});

let ins = ['L'];
let facing = 'W';
let steps = 0;
// let i = 0;
while (true) {
    // i++;
    let n = next(pos, facing);
    if (n === false) {
        ins.push(steps);
        break;
    }
    if (n.forward) {
        steps += 1;
        pos = n.pos;
    }
    if (n.turn) {
        ins.push(steps);
        ins.push(n.turn);
        steps = 0;
        facing = n.facing;
    }
}

// console.log(i, ins.length);
// console.log(ins.join(','));

// L,10,R,8,R,8,
// L,10,R,8,R,8,
// L,10,L,12,R,8,R,10,
// R,10,L,12,R,10,
// L,10,L,12,R,8,R,10,
// R,10,L,12,R,10,
// L,10,L,12,R,8,R,10,
// R,10,L,12,R,10,
// R,10,L,12,R,10,
// L,10,R,8,R,8
//
// R,10,L,12,R,10
// L,10,R,8,R,8
// L,10,L,12,R,8,R,10
//
let stats = [];
for (let j = 2; j <= 10; j += 2) {
    for (let i = 0; i < ins.length - j; i += 2) {
        let part = ins.slice(i, i + j).join(',');
        stats.push({
            part: part,
            count: ins.join(',').match(new RegExp(part, 'g')).length
        });
    }
}
stats.sort((s1, s2) => {
    return s2.count * s2.part.length - s1.count * s1.part.length;
});
console.log(
    stats
        .slice(0, 15)
        .map((s) => `${s.part} :: ${s.count}`)
        .join('\n')
);

let A = 'R,10,L,12,R,10';
let B = 'L,10,R,8,R,8';
let C = 'L,10,L,12,R,8,R,10';
let main = 'B,B,C,A,C,A,C,A,A,B';
// console.log([B,B,C,A,C,A,C,A,A,B].join(',') === ins.join(','));

function toAsciiInput(str) {
    let arr = str.split('').map((c) => c.charCodeAt(0));
    // console.log('arr', arr.length);
    return [...arr, 10];
}

let prg = createProgram(data().replace(/^\d+/, '2'));
let output = prg.run([
    ...toAsciiInput(main),
    ...toAsciiInput(A),
    ...toAsciiInput(B),
    ...toAsciiInput(C),
    ...toAsciiInput('n')
]);
// console.log(output);
console.log(output.slice(-1)[0]);

function toIntList(str, sep = ',') {
    return (str + '').split(sep).map((s) => parseInt(s, 10));
}

function createProgram(str, outputCount = -1, debug = false) {
    let list = toIntList(str);
    let pos = 0;
    let output = [];
    let halted = false;
    let firstRun = true;
    let base = 0;

    const getParam = (pos, mode) => {
        if (mode === 1) {
            return pos;
        }
        let v = list[pos + (mode === 2 ? base : 0)];
        return v === undefined ? 0 : v;
    };

    const reset = () => {
        list = toIntList(str);
        pos = 0;
        output = [];
        halted = false;
        firstRun = true;
        base = 0;
    };

    const run = (input) => {
        halted = false;
        output = [];
        debug && console.log('run', input, list);
        while (!halted) {
            if (halted) {
                return output;
            }
            let [ins, p1, p2, p3] = list.slice(pos, pos + 4);
            let op = ins % 100;
            let m1 = Math.floor((ins / 100) % 10);
            let m2 = Math.floor((ins / 1000) % 10);
            let m3 = Math.floor((ins / 10000) % 10);
            let v1 = getParam(p1, m1);
            let v2 = getParam(p2, m2);
            if (m1 === 2) p1 += base;
            if (m2 === 2) p2 += base;
            if (m3 === 2) p3 += base;
            // console.log(' >>>> ' , { pos, op, p1, p2, p3, v1, v2, input, output });
            if (op === 1) {
                if (debug)
                    console.log(
                        `1:(${m1}|${p1},${m2}|${p2},${p3}) add, write address ${p3} (${list[p3]}) with ${v1} + ${v2} = ${v1 + v2}`
                    );
                list[p3] = v1 + v2;
                pos += 4;
            }
            if (op === 2) {
                if (debug)
                    console.log(
                        `2: multiply, write address ${p3} (${list[p3]}) with ${v1} * ${v2} = ${v1 * v2}`
                    );
                list[p3] = v1 * v2;
                pos += 4;
            }
            if (op === 3) {
                if (debug) console.log(`3: read input ${input[0]}`);
                list[p1] = input.shift();
                pos += 2;
            }
            if (op === 4) {
                if (debug) console.log(`4: output ${v1}`);
                output = [...output, v1];
                pos += 2;
                // if(haltOnOutput) {
                //     let _output = [...output];
                //     output = [];
                //     return _output;
                // }
                if (output.length === outputCount) {
                    let _output = [...output];
                    output = [];
                    return _output;
                }
            }
            if (op === 5) {
                if (debug)
                    console.log(
                        `5: jump pos ${pos} to ${v1 !== 0 ? v2 : pos + 3}`
                    );
                pos = v1 != 0 ? v2 : pos + 3;
            }
            if (op === 6) {
                if (debug)
                    console.log(
                        `6: jump pos ${pos} to ${v1 === 0 ? v2 : pos + 3}`
                    );
                pos = v1 == 0 ? v2 : pos + 3;
            }
            if (op === 7) {
                if (debug)
                    console.log(
                        `7: less than: write address ${p3} (${list[p3]}) with ${v1 < v2 ? 1 : 0}`
                    );
                list[p3] = v1 < v2 ? 1 : 0;
                pos += 4;
            }
            if (op === 8) {
                if (debug)
                    console.log(
                        `8: equal, write address ${p3} (${list[p3]}) with ${v1 === v2 ? 1 : 0}`
                    );
                list[p3] = v1 == v2 ? 1 : 0;
                pos += 4;
            }
            if (op === 9) {
                if (debug) console.log(`9: adjust base ${base} +${v1}`);
                base += v1;
                pos += 2;
            }
            if (op === 99) {
                if (debug) console.log(`99: halt, output ${output[0]}`);
                halted = true;
                // pos += 1;
                return output;
            }
        }
    };
    return {
        run,
        halted: () => halted,
        output: () => output,
        reset
    };
}
