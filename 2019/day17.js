//AOC2019 D17

const result = createProgram(data()).run()

const str = result.reduce((a, c) => a + String.fromCharCode(c), '');
console.log(str);
const map = {};
str.split('\n').forEach((l, j) => {
    l.split('').forEach((c, i) => {
        map[[i,j]] = c;
    });
});

function findNeighbors(map, k) {
    let [i,j] = toIntList(k);
    return [
        { value:map[[i-1,j]], pos: [i-1,j] },
        { value:map[[i+1,j]], pos: [i+1,j] },
        { value:map[[i,j-1]], pos: [i,j-1] },
        { value:map[[i,j+1]], pos: [i,j+1] }
    ];
}

let intersection = [];
Object.entries(map).forEach(([k, v]) => {
    if(/[#^<>v]/.test(v)){
        if(findNeighbors(map, k).every(n => n.value  === '#')) {
            // intersection.push([k,v]);
            intersection.push(k);
        }
    }
});

//part1
// console.log(intersection);
console.log(intersection.reduce((a, k) => {
    let [i,j] = toIntList(k);
    return a + i * j;
}, 0));


function forward([i,j], facing) {
    if(facing === 'N') j -= 1;
    if(facing === 'S') j += 1;
    if(facing === 'W') i -= 1;
    if(facing === 'E') i += 1;
    return { value: map[[i,j]], pos:[i,j] };
}

function backward([i,j], facing) {
    if(facing === 'N') j += 1;
    if(facing === 'S') j -= 1;
    if(facing === 'W') i += 1;
    if(facing === 'E') i -= 1;
    return { value:map[[i,j]], pos:[i,j] };
}

function next([i,j], facing) {
    let to = forward([i,j], facing)
    if(to.value === '#') {
        return { forward: true, pos: to.pos };
    }
    const from = backward([i,j], facing);
    let neighbors = findNeighbors(map, [i,j]).filter(s => s.value === '#' && s.pos+'' !== from.pos+'');
    if(neighbors.length === 0) { //deadend
        return false; 
    }
    if(neighbors.length !== 1) {
        throw new Error('should be at corner?')
    }
    let [ni,nj] = neighbors[0].pos;
    let turn;
    if(facing === 'N' && ni > i) return { turn:'R', facing:'E'};
    if(facing === 'N' && ni < i) return { turn:'L', facing:'W'};
    if(facing === 'S' && ni > i) return { turn:'L', facing:'E'};
    if(facing === 'S' && ni < i) return { turn:'R', facing:'W'};
    if(facing === 'E' && nj > j) return { turn:'R', facing:'S'};
    if(facing === 'E' && nj < j) return { turn:'L', facing:'N'};
    if(facing === 'W' && nj > j) return { turn:'L', facing:'S'};
    if(facing === 'W' && nj < j) return { turn:'R', facing:'N'};
}


let pos = toIntList(Object.entries(map).find(([k,v]) => /[\^<>v]/.test(v))[0]);
// console.log({pos});

let ins = ['L'];
let facing = 'W';
let steps = 0;
// let i = 0;
while(true) {
    // i++;
    let n = next(pos, facing);
    if(n === false) {
        ins.push(steps)
        break;
    }
    if(n.forward) {
        steps += 1;
        pos = n.pos;
    }
    if(n.turn) {
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
for(let j=2; j<=10; j+=2) {
    for(let i=0; i<ins.length - j; i+=2) {
        let part = ins.slice(i, i+j).join(',');
        stats.push({
            part: part,
            count: ins.join(',').match(new RegExp(part, 'g')).length
        });
    }
}
stats.sort((s1, s2) => {
    return s2.count * s2.part.length - s1.count * s1.part.length;
})
console.log(stats.slice(0, 15).map(s => `${s.part} :: ${s.count}`).join('\n'));

let A = 'R,10,L,12,R,10';
let B = 'L,10,R,8,R,8';
let C = 'L,10,L,12,R,8,R,10';
let main = 'B,B,C,A,C,A,C,A,A,B';
// console.log([B,B,C,A,C,A,C,A,A,B].join(',') === ins.join(','));

function toAsciiInput(str) {
    let arr = str.split('').map(c => c.charCodeAt(0));
    // console.log('arr', arr.length);
    return [...arr, 10];
}

let prg = createProgram(data().replace(/^\d+/, '2'));
let output = prg.run([
    ...toAsciiInput(main),
    ...toAsciiInput(A),
    ...toAsciiInput(B),
    ...toAsciiInput(C),
    ...toAsciiInput('n'),
]);
// console.log(output);
console.log(output.slice(-1)[0]);



function toIntList(str, sep =',') { 
    return (str+'').split(sep).map(s => parseInt(s,10)); 
}

function createProgram(str, outputCount = -1, debug = false){
    let list = toIntList(str);
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
        while(!halted) {
            if(halted) {
                return output;
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
                // if(haltOnOutput) {
                //     let _output = [...output];
                //     output = [];
                //     return _output;
                // }
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
                // pos += 1;
                return output;
            }
        }
    }
    return { 
        run,
        halted: () => halted,
        output: () => output,
        reset
    }
}

function data() {
    return `1,330,331,332,109,3492,1101,1182,0,15,1101,1483,0,24,1002,0,1,570,1006,570,36,101,0,571,0,1001,570,-1,570,1001,24,1,24,1105,1,18,1008,571,0,571,1001,15,1,15,1008,15,1483,570,1006,570,14,21101,58,0,0,1105,1,786,1006,332,62,99,21101,333,0,1,21101,73,0,0,1105,1,579,1102,1,0,572,1101,0,0,573,3,574,101,1,573,573,1007,574,65,570,1005,570,151,107,67,574,570,1005,570,151,1001,574,-64,574,1002,574,-1,574,1001,572,1,572,1007,572,11,570,1006,570,165,101,1182,572,127,1001,574,0,0,3,574,101,1,573,573,1008,574,10,570,1005,570,189,1008,574,44,570,1006,570,158,1105,1,81,21101,340,0,1,1106,0,177,21102,477,1,1,1106,0,177,21102,514,1,1,21101,176,0,0,1106,0,579,99,21102,184,1,0,1106,0,579,4,574,104,10,99,1007,573,22,570,1006,570,165,1002,572,1,1182,21102,1,375,1,21102,211,1,0,1105,1,579,21101,1182,11,1,21102,222,1,0,1105,1,979,21102,1,388,1,21101,233,0,0,1105,1,579,21101,1182,22,1,21101,244,0,0,1105,1,979,21102,401,1,1,21102,1,255,0,1105,1,579,21101,1182,33,1,21101,266,0,0,1106,0,979,21101,414,0,1,21102,1,277,0,1105,1,579,3,575,1008,575,89,570,1008,575,121,575,1,575,570,575,3,574,1008,574,10,570,1006,570,291,104,10,21102,1,1182,1,21101,0,313,0,1106,0,622,1005,575,327,1101,0,1,575,21101,327,0,0,1106,0,786,4,438,99,0,1,1,6,77,97,105,110,58,10,33,10,69,120,112,101,99,116,101,100,32,102,117,110,99,116,105,111,110,32,110,97,109,101,32,98,117,116,32,103,111,116,58,32,0,12,70,117,110,99,116,105,111,110,32,65,58,10,12,70,117,110,99,116,105,111,110,32,66,58,10,12,70,117,110,99,116,105,111,110,32,67,58,10,23,67,111,110,116,105,110,117,111,117,115,32,118,105,100,101,111,32,102,101,101,100,63,10,0,37,10,69,120,112,101,99,116,101,100,32,82,44,32,76,44,32,111,114,32,100,105,115,116,97,110,99,101,32,98,117,116,32,103,111,116,58,32,36,10,69,120,112,101,99,116,101,100,32,99,111,109,109,97,32,111,114,32,110,101,119,108,105,110,101,32,98,117,116,32,103,111,116,58,32,43,10,68,101,102,105,110,105,116,105,111,110,115,32,109,97,121,32,98,101,32,97,116,32,109,111,115,116,32,50,48,32,99,104,97,114,97,99,116,101,114,115,33,10,94,62,118,60,0,1,0,-1,-1,0,1,0,0,0,0,0,0,1,24,22,0,109,4,1202,-3,1,587,20101,0,0,-1,22101,1,-3,-3,21101,0,0,-2,2208,-2,-1,570,1005,570,617,2201,-3,-2,609,4,0,21201,-2,1,-2,1106,0,597,109,-4,2105,1,0,109,5,2102,1,-4,630,20102,1,0,-2,22101,1,-4,-4,21102,1,0,-3,2208,-3,-2,570,1005,570,781,2201,-4,-3,652,21001,0,0,-1,1208,-1,-4,570,1005,570,709,1208,-1,-5,570,1005,570,734,1207,-1,0,570,1005,570,759,1206,-1,774,1001,578,562,684,1,0,576,576,1001,578,566,692,1,0,577,577,21102,702,1,0,1106,0,786,21201,-1,-1,-1,1105,1,676,1001,578,1,578,1008,578,4,570,1006,570,724,1001,578,-4,578,21102,731,1,0,1106,0,786,1106,0,774,1001,578,-1,578,1008,578,-1,570,1006,570,749,1001,578,4,578,21101,756,0,0,1105,1,786,1105,1,774,21202,-1,-11,1,22101,1182,1,1,21102,774,1,0,1105,1,622,21201,-3,1,-3,1105,1,640,109,-5,2106,0,0,109,7,1005,575,802,20101,0,576,-6,20101,0,577,-5,1106,0,814,21101,0,0,-1,21102,1,0,-5,21102,0,1,-6,20208,-6,576,-2,208,-5,577,570,22002,570,-2,-2,21202,-5,49,-3,22201,-6,-3,-3,22101,1483,-3,-3,2101,0,-3,843,1005,0,863,21202,-2,42,-4,22101,46,-4,-4,1206,-2,924,21101,0,1,-1,1105,1,924,1205,-2,873,21101,35,0,-4,1105,1,924,1202,-3,1,878,1008,0,1,570,1006,570,916,1001,374,1,374,2102,1,-3,895,1102,1,2,0,2102,1,-3,902,1001,438,0,438,2202,-6,-5,570,1,570,374,570,1,570,438,438,1001,578,558,921,21002,0,1,-4,1006,575,959,204,-4,22101,1,-6,-6,1208,-6,49,570,1006,570,814,104,10,22101,1,-5,-5,1208,-5,41,570,1006,570,810,104,10,1206,-1,974,99,1206,-1,974,1102,1,1,575,21102,1,973,0,1106,0,786,99,109,-7,2106,0,0,109,6,21102,0,1,-4,21102,1,0,-3,203,-2,22101,1,-3,-3,21208,-2,82,-1,1205,-1,1030,21208,-2,76,-1,1205,-1,1037,21207,-2,48,-1,1205,-1,1124,22107,57,-2,-1,1205,-1,1124,21201,-2,-48,-2,1105,1,1041,21102,1,-4,-2,1105,1,1041,21102,1,-5,-2,21201,-4,1,-4,21207,-4,11,-1,1206,-1,1138,2201,-5,-4,1059,1201,-2,0,0,203,-2,22101,1,-3,-3,21207,-2,48,-1,1205,-1,1107,22107,57,-2,-1,1205,-1,1107,21201,-2,-48,-2,2201,-5,-4,1090,20102,10,0,-1,22201,-2,-1,-2,2201,-5,-4,1103,1202,-2,1,0,1106,0,1060,21208,-2,10,-1,1205,-1,1162,21208,-2,44,-1,1206,-1,1131,1105,1,989,21101,0,439,1,1106,0,1150,21101,0,477,1,1105,1,1150,21101,514,0,1,21102,1,1149,0,1106,0,579,99,21101,0,1157,0,1105,1,579,204,-2,104,10,99,21207,-3,22,-1,1206,-1,1138,2101,0,-5,1176,2102,1,-4,0,109,-6,2105,1,0,40,9,40,1,7,1,40,1,7,1,40,1,7,1,22,9,9,1,7,1,22,1,7,1,9,1,7,1,22,1,7,1,9,1,7,1,22,1,7,1,9,1,7,1,22,1,7,1,9,1,7,1,22,1,7,1,9,1,7,1,10,11,1,1,7,1,7,11,10,1,9,1,1,1,7,1,7,1,1,1,18,1,9,1,1,1,7,11,18,1,9,1,1,1,15,1,20,1,3,9,15,1,20,1,3,1,5,1,17,1,20,1,3,1,5,1,17,1,20,1,3,1,5,1,17,1,20,1,3,1,5,1,17,1,20,1,3,1,5,1,17,1,18,11,1,13,5,1,18,1,1,1,3,1,3,1,13,1,5,1,10,11,3,11,3,11,10,1,7,1,9,1,9,1,3,1,16,1,7,1,9,1,9,1,3,1,16,1,7,1,9,1,9,1,3,1,16,1,7,1,9,1,9,1,3,1,16,1,7,1,9,1,9,1,3,1,16,1,7,1,9,1,9,1,3,1,16,1,7,1,9,1,9,1,3,1,16,1,7,1,9,13,1,11,6,1,7,1,19,1,1,1,11,1,6,9,19,13,1,1,36,1,9,1,1,1,36,1,9,1,1,1,36,1,9,1,1,1,36,1,9,1,1,1,36,1,9,1,1,1,36,1,3,9,36,1,9,1,38,11,8`;
}
