//AOC2019 D7
var toIntList = (str, sep =',') => (str+'').split(sep).map(s => parseInt(s,10));

const createProgram = (str, phase) => {
    const list = toIntList(str);
    let pos = 0;
    let output = [];
    let halted = false;
    let firstRun = true;
    const run = (input) => {
        if(halted) {
            return output[0];
        }
        let [ins, p1, p2, p3] = list.slice(pos, pos + 4);
        let op = ins % 100;
        let m1 = Math.floor(ins / 100 % 10) === 1;
        let m2 = Math.floor(ins / 1000 % 10) === 1;
        let v1 = m1? p1 : list[p1];
        let v2 = m2? p2 : list[p2];
        // console.log(' >>>> ' , { pos, op, p1, p2, p3, v1, v2, input, output });
        if(op === 1) {
            list[p3] = v1 + v2;
            pos += 4;
        }
        if(op === 2) {
            list[p3] = v1 * v2;
            pos += 4;
        }
        if(op === 3) {
            list[p1] = input.shift();
            pos += 2;
        }
        if(op === 4) {
            output = [ list[p1], ...output];
            pos += 2;
            return output[0];
        }
        if(op === 5) {
            pos = v1 != 0? v2 : pos + 3;
        }
        if(op === 6) {
            pos = v1 == 0? v2 : pos + 3;
        }
        if(op === 7) {
            list[p3] = (v1 < v2)? 1 : 0;
            pos += 4;
        }
        if(op === 8) {
            list[p3] = (v1 == v2)? 1 : 0;
            pos += 4;
        }
        if(op === 99) {
            // pos = pos + 1;
            // console.log('halt', output);
            halted = true;
            return output[0]
        }
        return run(input);
    }
    return { 
        run: function(input) {
            if(firstRun) {
                firstRun = false;
                return run([phase, input])
            } else {
                return run([input]);
            }
        },
        halted: () => halted,
        output: () => output
    }
}

const amplify = (str, seq) => {
    var result = seq.map(phase => createProgram(str, phase)).reduce((input, prg) => {
        return prg.run(input);
    }, 0)
    return result;
}

/*
const testData = [
    ['3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0', [4,3,2,1,0], 43210],
    ['3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0', [0,1,2,3,4], 54321],
    ['3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0', [1,0,4,3,2], 65210]
];

testData.forEach(([str, phase, ans], i) => {
    console.log(i +':'+ (amplify(str, phase) === ans));
});
*/

const permutator = (inputArr) => {
    let result = [];
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
            return;
        }
        arr.forEach((v, i) => {
            permute(arr.filter((_, _i) => i !== _i), [...m, v]);
        });
    }
    permute(inputArr)
    return result;
}


console.log(Math.max(
    ...permutator([0,1,2,3,4]).map(seq => amplify(data(), seq))
));

const amplify2 = (str, seq) => {
    var programs = seq.map(phase => createProgram(str, phase));
    var result = 0;
    while(!programs[programs.length - 1].halted()) { 
        result = programs.reduce((r, prg) => {
            return prg.run(r);
        }, result)
    }
    return result;
}

console.log(Math.max(
    ...permutator([5,6,7,8,9]).map(seq => amplify2(`3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5`, seq))
));

console.log(Math.max(
    ...permutator([5,6,7,8,9]).map(seq => amplify2(data(), seq))
));




function data() { 
    return `3,8,1001,8,10,8,105,1,0,0,21,46,55,72,85,110,191,272,353,434,99999,3,9,1002,9,5,9,1001,9,2,9,102,3,9,9,101,2,9,9,102,4,9,9,4,9,99,3,9,102,5,9,9,4,9,99,3,9,1002,9,2,9,101,2,9,9,1002,9,2,9,4,9,99,3,9,1002,9,4,9,101,3,9,9,4,9,99,3,9,1002,9,3,9,101,5,9,9,1002,9,3,9,101,3,9,9,1002,9,5,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,99`;
}
