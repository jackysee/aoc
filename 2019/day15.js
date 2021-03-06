//AOC2019 D15

//movement: 1:north, 2:south, 3:west, 4:east
//status 0:wall, 1:moved, 2:found

const N = 1, E = 4, S = 2, W = 3;
let prg = createProgram(data(), 1);
let map = {};
let turnRight = M => ({ [N]:E, [E]:S, [S]:W, [W]:N }[M]);
let turnLeft = M => ({ [N]:W, [W]:S, [S]:E, [E]:N }[M]);

function run(isTurnRight = true) {
    let pos = [0, 0];
    map[pos] = 'S';
    let blocked = [];
    let facing = N;
    let move = isTurnRight? turnRight(facing) : turnLeft(facing);
    let nextMove = () => {
        let prefer = isTurnRight? [
            turnRight(facing),
            facing,
            turnLeft(facing),
            turnLeft(turnLeft(facing))
        ] : [
            turnLeft(facing),
            facing,
            turnRight(facing),
            turnRight(turnRight(facing))
        ];
        return prefer.find(d => !blocked.includes(d));
    }

    let step = 0;
    let dest;

    while(true) {
        let [result] = prg.run([move]);
        let [x,y] = pos;
        let block = [
            move === W? x - 1 : move === E? x + 1 : x,
            move === N? y + 1 : move === S? y - 1 : y
        ];
        if(result === 0) { //wall
            map[block] = '\u2588';
            blocked.push(move);
            move = nextMove();
        }
        if(result === 1) {
            map[block] = '.';
            pos = block;
            facing = move;
            blocked = [];
            move = nextMove();
        }
        if(result === 2) {
            map[block] = 'O';
            pos = block;
            dest = pos;
            break;
        }
    }
    return dest;
}

function draw(map, [x,y]) {
    let e = Object.entries(map);
    if(!e.length) {
        return '';
    }
    let pts = e.map(([k]) => toIntList(k));
    let minx = Math.min(...pts.map(p => p[0]));
    let maxx = Math.max(...pts.map(p => p[0]));
    let miny = Math.min(...pts.map(p => p[1]));
    let maxy = Math.max(...pts.map(p => p[1]));
    let result = [];
    for(let j=maxy; j>=miny; j--) {
        let str = '';
        for(let i=minx; i<=maxx; i++) {
            if(x === 0 && y === 0) {
                str += 'S';
            } else if(x === i && y === j && map[[i,j]] !== 'O') {
                str += 'X';
            } else {
                str += (map[[i,j]] || ' ');
            }
        }
        result.push(str);
    }
    return result.join('\n');
};

run();
prg.reset();
let dest = run(false);
console.log(draw(map, dest));


function shortestPath() {
    let visited = new Set();
    let queue = [ { p:[0,0], dist:0 } ];
    while(queue.length !== 0) {
        if(queue.length % 10000 === 0) {
            console.log(queue.length);
        }
        let pos = queue.shift();
        if(pos.p+'' === dest+'') {
            return pos.dist;
        }
        let [x,y] = pos.p;
        let points = [
            [x-1,y],
            [x+1,y],
            [x,y-1],
            [x,y+1]
        ]
            .filter(p => map[p] !== '#' && !visited.has(p+''))
            .map(p => ({ p, dist: pos.dist + 1 }))
        points.forEach(p => visited.add(p.p+''));
        queue = [...queue, ...points];
    }
    return -1;
}

console.log(shortestPath());

function getSpaces() {
    return Object.values(map).filter(x => x === '.' || x === 'S').length;
}
function spreadOxygen(map) {
    let minutes = 0;
    while(true) {
        let space = getSpaces();
        if(space === 0) {
            break;
        }
        Object.entries(map)
            .filter(([k, v]) => v === 'O')
            .forEach(([k]) => {
                let [x,y] = toIntList(k);
                [
                    [x-1,y],
                    [x+1,y],
                    [x,y-1],
                    [x,y+1]
                ].forEach(a => {
                    if(map[a] === '.' || map[a] === 'S')  {
                        map[a] = 'O';
                    }
                });
            })
        minutes++;
    }
    return minutes;
}

console.log(spreadOxygen(map));

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
    return `3,1033,1008,1033,1,1032,1005,1032,31,1008,1033,2,1032,1005,1032,58,1008,1033,3,1032,1005,1032,81,1008,1033,4,1032,1005,1032,104,99,1002,1034,1,1039,102,1,1036,1041,1001,1035,-1,1040,1008,1038,0,1043,102,-1,1043,1032,1,1037,1032,1042,1105,1,124,101,0,1034,1039,102,1,1036,1041,1001,1035,1,1040,1008,1038,0,1043,1,1037,1038,1042,1106,0,124,1001,1034,-1,1039,1008,1036,0,1041,1002,1035,1,1040,1001,1038,0,1043,101,0,1037,1042,1106,0,124,1001,1034,1,1039,1008,1036,0,1041,101,0,1035,1040,102,1,1038,1043,1002,1037,1,1042,1006,1039,217,1006,1040,217,1008,1039,40,1032,1005,1032,217,1008,1040,40,1032,1005,1032,217,1008,1039,35,1032,1006,1032,165,1008,1040,9,1032,1006,1032,165,1101,0,2,1044,1105,1,224,2,1041,1043,1032,1006,1032,179,1102,1,1,1044,1105,1,224,1,1041,1043,1032,1006,1032,217,1,1042,1043,1032,1001,1032,-1,1032,1002,1032,39,1032,1,1032,1039,1032,101,-1,1032,1032,101,252,1032,211,1007,0,26,1044,1105,1,224,1101,0,0,1044,1106,0,224,1006,1044,247,102,1,1039,1034,101,0,1040,1035,102,1,1041,1036,1002,1043,1,1038,1001,1042,0,1037,4,1044,1106,0,0,22,11,19,72,14,9,6,73,82,17,41,18,83,18,49,19,12,14,39,17,20,69,20,12,48,8,8,59,36,7,33,1,15,13,10,46,96,15,2,22,80,99,12,68,99,79,22,84,16,45,25,51,4,20,95,4,51,43,13,89,2,91,48,2,46,55,24,84,8,88,10,98,46,57,15,27,7,1,19,20,63,24,50,13,63,13,59,19,13,53,75,8,20,8,44,44,21,5,11,76,9,21,2,11,27,61,6,12,72,22,40,11,9,50,18,2,38,21,78,18,13,99,9,74,5,22,30,35,5,16,34,91,55,4,19,28,42,21,62,12,74,94,16,40,2,95,54,21,2,23,56,34,9,49,47,14,39,9,65,35,53,23,25,68,15,95,25,70,27,3,33,2,31,17,40,60,24,94,34,6,99,9,92,1,92,7,49,32,8,46,47,13,37,15,11,2,15,24,8,73,8,21,64,19,74,24,5,60,9,21,47,12,12,72,18,39,90,16,6,85,13,71,19,14,24,2,65,11,51,9,19,23,34,12,9,88,77,17,6,72,19,79,39,19,21,95,87,24,91,53,7,29,20,25,11,39,38,24,72,6,1,97,15,87,11,77,64,17,57,95,9,85,19,77,8,18,97,8,39,49,4,16,81,12,36,7,7,81,22,52,56,22,47,42,4,46,75,21,19,85,37,22,90,20,10,56,24,85,55,4,91,7,22,86,1,89,13,68,35,14,27,35,9,44,79,12,42,20,16,28,89,11,57,10,60,15,13,95,3,48,24,90,86,51,18,8,71,11,80,91,5,4,93,9,80,94,9,31,7,6,90,6,57,18,19,41,69,57,8,3,42,21,16,5,79,9,13,56,99,98,19,22,85,14,35,12,21,69,16,23,3,5,78,68,2,24,12,35,36,24,93,72,12,16,7,7,19,56,8,69,45,94,18,49,44,61,21,25,19,96,7,13,27,50,76,14,5,60,4,11,90,60,9,31,85,17,11,18,74,37,20,53,53,1,42,93,66,24,10,10,73,36,19,84,14,87,71,18,64,58,3,9,70,14,10,62,81,25,19,52,5,3,78,10,66,84,84,14,66,9,19,81,8,56,11,7,39,84,31,98,22,25,56,4,12,43,78,20,19,43,88,23,10,62,90,22,38,29,5,29,32,20,14,1,3,44,13,92,79,11,59,22,77,38,3,83,18,22,37,24,32,8,19,47,20,23,32,14,72,80,24,37,33,20,8,12,17,31,20,13,51,68,65,19,31,1,1,47,88,15,31,25,94,4,11,95,87,16,77,86,92,3,2,48,39,52,62,22,63,1,70,18,61,78,14,12,50,75,10,30,2,10,96,13,58,87,9,90,3,83,5,13,28,3,67,66,21,46,10,1,70,64,8,10,50,13,22,93,3,58,13,58,2,69,1,44,2,18,22,61,61,25,36,20,7,31,6,2,7,29,2,27,22,93,16,25,8,79,93,22,2,29,27,12,56,48,34,6,40,14,13,8,14,2,8,64,32,19,18,99,22,83,83,79,16,84,58,22,88,19,31,18,35,18,31,85,20,30,16,75,16,46,16,65,16,3,44,6,2,65,97,24,40,20,25,31,88,14,66,20,13,11,76,18,43,67,13,92,47,9,81,78,20,51,12,7,43,17,24,99,14,4,89,13,84,48,13,60,13,51,23,66,7,61,19,91,17,72,64,48,10,74,13,85,8,76,11,72,3,32,22,37,80,44,18,86,50,71,5,36,21,76,23,64,23,61,40,62,24,61,0,0,21,21,1,10,1,0,0,0,0,0,0`;
}
