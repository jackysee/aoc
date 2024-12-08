//AOC2019 D19

let prg = createProgram(data(), -1);

let getPoint = (i,j) => {
    if(i < 0 || j < 0) return undefined;
    let [result] = prg.run([i,j]);
    prg.reset();
    return (result === 1) ? '#' : undefined;
}

function createMap(size = 50, x = 0, y = 0) {
    let map = {};
    for(let j=y; j<size + y; j++) {
        for(let i=x; i<size + x; i++) {
            let x = getPoint(i,j);
            if(x) map[[i,j]] = x;
        }
    }
    return map;

}

function render(map, size = 50, x = 0, y = 0, highlight) {
    let str = '';
    for(let j=y; j<size + y; j++) {
        for(let i=x; i<size + x; i++) {
            let hl;
            if(highlight.find(([_i,_j]) => _i === i && _j === j)){
                hl = 'O';
            }
            str += hl || map[[i,j]] || '.';
        }
        str += '\n';
    }
    return str;
}

console.log(Object.keys(createMap()).length);

let x = 0, y = 5;
while(true) {
    let c = getPoint(x, y);
    let dr = getPoint(x+1, y+1);
    let r = getPoint(x+1, y);
    if(c === '#') {
        let _c = getPoint(x+99, y-99);
        if(_c === '#') {
            break;
        } 
        if(dr !== '#' && r === '#') {
            x += 1;
        } else {
            y += 1;
        }
    } else {
        x += 1;
    }
}
console.log(x * 10000 + (y - 99));

// let arg = [50, 0, 0];
// let arg = [100, 1872, 1599];
// console.log(render(createMap(...arg), ...arg, pp));



function ints(str, sep =',') { 
    return (str+'').split(sep).map(s => parseInt(s,10)); 
}

function createProgram(str, outputCount = -1, debug = false){
    let list = ints(str);
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
    return `109,424,203,1,21101,11,0,0,1106,0,282,21102,1,18,0,1105,1,259,1202,1,1,221,203,1,21101,0,31,0,1105,1,282,21102,38,1,0,1106,0,259,21002,23,1,2,21202,1,1,3,21102,1,1,1,21102,57,1,0,1106,0,303,1202,1,1,222,20102,1,221,3,20102,1,221,2,21102,259,1,1,21102,80,1,0,1105,1,225,21101,0,145,2,21102,91,1,0,1105,1,303,2101,0,1,223,20101,0,222,4,21102,259,1,3,21101,225,0,2,21102,1,225,1,21102,1,118,0,1105,1,225,20101,0,222,3,21101,0,197,2,21101,133,0,0,1106,0,303,21202,1,-1,1,22001,223,1,1,21101,0,148,0,1105,1,259,1202,1,1,223,21001,221,0,4,21001,222,0,3,21102,1,19,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21102,195,1,0,105,1,109,20207,1,223,2,21002,23,1,1,21102,-1,1,3,21101,0,214,0,1105,1,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,1201,-4,0,249,22101,0,-3,1,22101,0,-2,2,21202,-1,1,3,21102,250,1,0,1106,0,225,22101,0,1,-4,109,-5,2105,1,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2106,0,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,22102,1,-2,-2,109,-3,2105,1,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,21201,-2,0,3,21101,343,0,0,1105,1,303,1105,1,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,22101,0,-4,1,21102,384,1,0,1106,0,303,1106,0,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,22102,1,1,-4,109,-5,2105,1,0`;
}
