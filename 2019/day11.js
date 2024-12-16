//AOC2019 Day 11
import data from './day11_input.js';
const toIntList = (str, sep = ',') =>
    (str + '').split(sep).map((s) => parseInt(s, 10));

const createProgram = (str, outputCount = -1, debug = false) => {
    const list = toIntList(str);
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

    const run = (input) => {
        while (!halted) {
            if (halted) {
                return output[0];
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
                return output;
            }
        }
    };
    return {
        run,
        halted: () => halted,
        output: () => output
    };
};

function paint(startingPanel) {
    let currentPoint = [0, 0];
    const dirs = 'ULDR';
    let dirIdx = 0;
    const canvas = {};
    const prg = createProgram(data(), 2);
    do {
        const color =
            canvas[currentPoint] !== undefined
                ? canvas[currentPoint]
                : startingPanel;
        const [_color, turn] = prg.run([color]);
        canvas[currentPoint] = _color;
        if (turn === 0) {
            //turn left
            dirIdx = dirIdx === 3 ? 0 : dirIdx + 1;
        }
        if (turn === 1) {
            //turn right
            dirIdx = dirIdx === 0 ? 3 : dirIdx - 1;
        }
        const [x, y] = currentPoint;
        if (dirs[dirIdx] === 'U') currentPoint = [x, y - 1];
        if (dirs[dirIdx] === 'D') currentPoint = [x, y + 1];
        if (dirs[dirIdx] === 'L') currentPoint = [x - 1, y];
        if (dirs[dirIdx] === 'R') currentPoint = [x + 1, y];
    } while (!prg.halted());
    return canvas;
}
console.log(Object.keys(paint(0)).length);

const canvas = paint(1);
const points = Object.keys(canvas).map((s) => toIntList(s));
const minx = Math.min(...points.map((i) => i[0]));
const maxx = Math.max(...points.map((i) => i[0]));
const miny = Math.min(...points.map((i) => i[1]));
const maxy = Math.max(...points.map((i) => i[1]));

var str = '';
for (let j = miny; j <= maxy; j++) {
    for (let i = minx; i <= maxx; i++) {
        let c = canvas[[i, j]];
        str += c === undefined ? '.' : c === 0 ? '.' : '#';
    }
    str += '\n';
}
console.log(str);
