//AOC2019 Day 11

const toIntList = (str, sep =',') => (str+'').split(sep).map(s => parseInt(s,10));

const createProgram = (str, outputCount = 1, debug = false) => {
    const list = toIntList(str);
    let pos = 0;
    let output = [];
    let halted = false;
    let firstRun = true;
    let base = 0;

    const getParam = (pos, mode) => {
        if(mode === 1) {
            return pos;
        } 
        let v = list[pos + (mode === 2? base: 0)];
        return v === undefined? 0 : v;
    }

    const run = (input) => {
        while(!halted) {
            if(halted) {
                return output[0];
            }
            let [ins, p1, p2, p3] = list.slice(pos, pos + 4);
            let op = ins % 100;
            let m1 = Math.floor(ins / 100 % 10);
            let m2 = Math.floor(ins / 1000 % 10);
            let m3 = Math.floor(ins / 10000 % 10);
            let v1 = getParam(p1, m1);
            let v2 = getParam(p2, m2);
            if(m1 === 2) p1 += base;
            if(m2 === 2) p2 += base;
            if(m3 === 2) p3 += base;
            // console.log(' >>>> ' , { pos, op, p1, p2, p3, v1, v2, input, output });
            if(op === 1) {
                if(debug) console.log(`1:(${m1}|${p1},${m2}|${p2},${p3}) add, write address ${p3} (${list[p3]}) with ${v1} + ${v2} = ${v1 + v2}`)
                list[p3] = v1 + v2;
                pos += 4;
            }
            if(op === 2) {
                if(debug) console.log(`2: multiply, write address ${p3} (${list[p3]}) with ${v1} * ${v2} = ${v1 * v2}`)
                list[p3] = v1 * v2;
                pos += 4;
            }
            if(op === 3) {
                if(debug) console.log(`3: read input ${input[0]}`)
                list[p1] = input.shift();
                pos += 2;
            }
            if(op === 4) {
                if(debug) console.log(`4: output ${v1}`)
                output = [...output, v1]
                pos += 2;
                if(output.length === outputCount) {
                    let _output = [...output];
                    output = [];
                    return _output;
                }
            }
            if(op === 5) {
                if(debug) console.log(`5: jump pos ${pos} to ${v1 !== 0? v2: pos + 3}`)
                pos = v1 != 0? v2 : pos + 3;
            }
            if(op === 6) {
                if(debug) console.log(`6: jump pos ${pos} to ${v1 === 0? v2: pos + 3}`)
                pos = v1 == 0? v2 : pos + 3;
            }
            if(op === 7) {
                if(debug) console.log(`7: less than: write address ${p3} (${list[p3]}) with ${v1 < v2? 1 : 0}`);
                list[p3] = (v1 < v2)? 1 : 0;
                pos += 4;
            }
            if(op === 8) {
                if(debug) console.log(`8: equal, write address ${p3} (${list[p3]}) with ${v1 === v2? 1 : 0}`)
                list[p3] = (v1 == v2)? 1 : 0;
                pos += 4;
            }
            if(op === 9) {
                if(debug) console.log(`9: adjust base ${base} +${v1}`);
                base += v1;
                pos += 2;
            }
            if(op === 99) {
                if(debug) console.log(`99: halt, output ${output[0]}`);
                halted = true;
                return output;
            }
        }
    }
    return { 
        run,
        halted: () => halted,
        output: () => output
    }
}

function paint(startingPanel) {
    let currentPoint = [0, 0];
    const dirs = 'ULDR';
    let dirIdx = 0;
    const canvas = {};
    const prg = createProgram(data(), 2);
    // let i = 0;
    do {
        const color = canvas[currentPoint] !== undefined? canvas[currentPoint] : startingPanel;
        const [_color, turn]= prg.run([color]);
        canvas[currentPoint] = _color;
        if(turn === 0) { //turn left
            dirIdx = dirIdx === 3 ? 0 : dirIdx + 1;
        }
        if(turn === 1) { //turn right
            dirIdx = dirIdx === 0 ? 3 : dirIdx - 1;
        }
        // if(i < 10) {
        //     console.log( { currentPoint, inputColor:color, output: [_color, turn], dir:dirs[dirIdx] });
        // }
        // i++;
        const [x,y] = currentPoint;
        if(dirs[dirIdx] === 'U') currentPoint = [x, y-1];
        if(dirs[dirIdx] === 'D') currentPoint = [x, y+1];
        if(dirs[dirIdx] === 'L') currentPoint = [x-1, y];
        if(dirs[dirIdx] === 'R') currentPoint = [x+1, y];
    } while (!prg.halted())
    return canvas;
}

console.log(Object.keys(paint(0)).length);


const canvas = paint(1);
const points = Object.keys(canvas).map(s => toIntList(s));
const minx = Math.min(...points.map(i => i[0]));
const maxx = Math.max(...points.map(i => i[0]));
const miny = Math.min(...points.map(i => i[1]));
const maxy = Math.max(...points.map(i => i[1]));

var str = '';
for(let j=miny; j<=maxy; j++) {
    for(let i=minx; i<=maxx; i++) {
        let c = canvas[[i,j]];
        str += c === undefined? '.' : (c === 0? '.' :'#');
    }
    str += '\n';
}
console.log(str);

function data() {
    return `3,8,1005,8,328,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1002,8,1,28,1,1003,10,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,102,1,8,54,2,1103,6,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,101,0,8,80,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,1,8,10,4,10,1002,8,1,102,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1001,8,0,124,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,1001,8,0,147,1006,0,35,1,7,3,10,2,106,13,10,2,1104,9,10,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1002,8,1,183,2,7,16,10,2,105,14,10,1,1002,12,10,1006,0,13,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1002,8,1,220,1006,0,78,2,5,3,10,1006,0,92,1006,0,92,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,1001,8,0,255,1006,0,57,2,1001,11,10,1006,0,34,2,1007,18,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,1002,8,1,292,2,109,3,10,1,1103,14,10,2,2,5,10,2,1006,3,10,101,1,9,9,1007,9,997,10,1005,10,15,99,109,650,104,0,104,1,21101,932700762920,0,1,21101,0,345,0,1105,1,449,21102,1,386577306516,1,21102,356,1,0,1106,0,449,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,179355975827,0,1,21101,403,0,0,1106,0,449,21102,1,46413220903,1,21102,1,414,0,1106,0,449,3,10,104,0,104,0,3,10,104,0,104,0,21101,988224959252,0,1,21102,1,437,0,1106,0,449,21101,717637968660,0,1,21101,0,448,0,1106,0,449,99,109,2,22101,0,-1,1,21102,40,1,2,21101,480,0,3,21101,470,0,0,1106,0,513,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,475,476,491,4,0,1001,475,1,475,108,4,475,10,1006,10,507,1102,1,0,475,109,-2,2105,1,0,0,109,4,2102,1,-1,512,1207,-3,0,10,1006,10,530,21102,1,0,-3,22102,1,-3,1,22101,0,-2,2,21102,1,1,3,21101,0,549,0,1105,1,554,109,-4,2105,1,0,109,5,1207,-3,1,10,1006,10,577,2207,-4,-2,10,1006,10,577,21202,-4,1,-4,1106,0,645,21202,-4,1,1,21201,-3,-1,2,21202,-2,2,3,21102,1,596,0,1106,0,554,21201,1,0,-4,21101,1,0,-1,2207,-4,-2,10,1006,10,615,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,637,21201,-1,0,1,21101,0,637,0,105,1,512,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0`;
}
