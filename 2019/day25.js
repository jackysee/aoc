//AOC2019 D25
import data from './day25_input.js';

const prg = createProgram(data());
const str = (arr) => arr.reduce((a, c) => a + String.fromCharCode(c), '');
function input(str) {
    let arr = str.split('').map((c) => c.charCodeAt(0));
    return [...arr, 10];
}

prg.run([]);
console.log(str(prg.output()));

let command = `
south
west
take shell
east
east
take space heater
west
north
west
north
take jam
east
south
take asterisk
south
take klein bottle
east
take spool of cat6
west
north
north
west
north
take astronaut ice cream
north
east
south
take space law space brochure
north
west
south
south
south
south
west
inv
drop spool of cat6
drop space law space brochure
//drop asterisk
drop jam
drop shell
//drop astronaut ice cream
//drop space heater
//drop klein bottle
south
`.trim();

command.split('\n').forEach((c, i) => {
    if (c.indexOf('//') !== 0) {
        console.log('----- command: ', i, c);
        prg.run(input(c));
        console.log(str(prg.output()));
    }
});

function ints(s) {
    return s.split(',').map(Number);
}

function createProgram(str, outputCount = -1, debug = false) {
    let list = ints(str);
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
        list = ints(str);
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
            // console.log('op', op);
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
                // console.log('op3 input', input[0]);
                if (input[0] === undefined) {
                    return;
                }
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
        output: (clear = false) => {
            if (clear) {
                let _output = [...output];
                output = [];
                return _output;
            }
            return output;
        },
        reset
    };
}
