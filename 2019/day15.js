//AOC2019 D15
import data from './day15_input.js';

//movement: 1:north, 2:south, 3:west, 4:east
//status 0:wall, 1:moved, 2:found

const N = 1,
    E = 4,
    S = 2,
    W = 3;
let prg = createProgram(data(), 1);
let map = {};
let turnRight = (M) => ({ [N]: E, [E]: S, [S]: W, [W]: N })[M];
let turnLeft = (M) => ({ [N]: W, [W]: S, [S]: E, [E]: N })[M];

function run(isTurnRight = true) {
    let pos = [0, 0];
    map[pos] = 'S';
    let blocked = [];
    let facing = N;
    let move = isTurnRight ? turnRight(facing) : turnLeft(facing);
    let nextMove = () => {
        let prefer = isTurnRight
            ? [
                  turnRight(facing),
                  facing,
                  turnLeft(facing),
                  turnLeft(turnLeft(facing))
              ]
            : [
                  turnLeft(facing),
                  facing,
                  turnRight(facing),
                  turnRight(turnRight(facing))
              ];
        return prefer.find((d) => !blocked.includes(d));
    };

    let step = 0;
    let dest;

    while (true) {
        let [result] = prg.run([move]);
        let [x, y] = pos;
        let block = [
            move === W ? x - 1 : move === E ? x + 1 : x,
            move === N ? y + 1 : move === S ? y - 1 : y
        ];
        if (result === 0) {
            //wall
            map[block] = '\u2588';
            blocked.push(move);
            move = nextMove();
        }
        if (result === 1) {
            map[block] = '.';
            pos = block;
            facing = move;
            blocked = [];
            move = nextMove();
        }
        if (result === 2) {
            map[block] = 'O';
            pos = block;
            dest = pos;
            break;
        }
    }
    return dest;
}

function draw(map, [x, y]) {
    let e = Object.entries(map);
    if (!e.length) {
        return '';
    }
    let pts = e.map(([k]) => toIntList(k));
    let minx = Math.min(...pts.map((p) => p[0]));
    let maxx = Math.max(...pts.map((p) => p[0]));
    let miny = Math.min(...pts.map((p) => p[1]));
    let maxy = Math.max(...pts.map((p) => p[1]));
    let result = [];
    for (let j = maxy; j >= miny; j--) {
        let str = '';
        for (let i = minx; i <= maxx; i++) {
            if (x === 0 && y === 0) {
                str += 'S';
            } else if (x === i && y === j && map[[i, j]] !== 'O') {
                str += 'X';
            } else {
                str += map[[i, j]] || ' ';
            }
        }
        result.push(str);
    }
    return result.join('\n');
}

run();
prg.reset();
let dest = run(false);
console.log(draw(map, dest));

function shortestPath() {
    let visited = new Set();
    let queue = [{ p: [0, 0], dist: 0 }];
    while (queue.length !== 0) {
        if (queue.length % 10000 === 0) {
            console.log(queue.length);
        }
        let pos = queue.shift();
        if (pos.p + '' === dest + '') {
            return pos.dist;
        }
        let [x, y] = pos.p;
        let points = [
            [x - 1, y],
            [x + 1, y],
            [x, y - 1],
            [x, y + 1]
        ]
            .filter((p) => map[p] !== '#' && !visited.has(p + ''))
            .map((p) => ({ p, dist: pos.dist + 1 }));
        points.forEach((p) => visited.add(p.p + ''));
        queue = [...queue, ...points];
    }
    return -1;
}

console.log(shortestPath());

function getSpaces() {
    return Object.values(map).filter((x) => x === '.' || x === 'S').length;
}
function spreadOxygen(map) {
    let minutes = 0;
    while (true) {
        let space = getSpaces();
        if (space === 0) {
            break;
        }
        Object.entries(map)
            .filter(([k, v]) => v === 'O')
            .forEach(([k]) => {
                let [x, y] = toIntList(k);
                [
                    [x - 1, y],
                    [x + 1, y],
                    [x, y - 1],
                    [x, y + 1]
                ].forEach((a) => {
                    if (map[a] === '.' || map[a] === 'S') {
                        map[a] = 'O';
                    }
                });
            });
        minutes++;
    }
    return minutes;
}

console.log(spreadOxygen(map));

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
