import data from './day13_input.js';
function parse(str) {
    let [t, buses] = str.split('\n');
    return {
        t: parseInt(t, 10),
        buses: buses.split(',').map((x) => (x === 'x' ? 'x' : parseInt(x, 10)))
    };
}

function part1(str) {
    const d = parse(str);
    let min,
        idx = 0;
    d.buses.forEach((v, i) => {
        if (v === 'x') return;
        v = v - (d.t % v);
        if (min === undefined || v < min) {
            min = v;
            idx = i;
        }
    });
    return min * d.buses[idx];
}
console.log(part1(data()));

function part2(str) {
    let { buses } = parse(str);
    let idx = -1,
        t = -1,
        x = 1,
        r = -1,
        b = -1;
    while (true) {
        if (idx >= buses.length) {
            return t;
        }
        let bus = buses[idx];
        if (bus === 'x' || bus === undefined) {
            idx++;
            r++;
            continue;
        }
        if (t === -1) {
            t = bus;
            idx++;
            x = 0;
            b = t;
            r++;
            continue;
        }
        if ((t + b * x + r) % bus !== 0) {
            x++;
        } else {
            idx++;
            r++;
            t = t + b * x;
            b = b * bus;
            x = 0;
        }
    }
}
// console.log(part2('0\n17,x,13,19')); //3417
// console.log(part2('0\n7,13,x,x,59,x,31,19')); //106871
// console.log(part2(`0\n67,7,59,61`)); //754018
// console.log(part2(`0\n67,x,7,59,61`)); //779210
// console.log(part2('0\n67,7,x,59,61')); //1261476
// console.log(part2('0\n1789,37,47,1889')); //1202161486
console.log(part2(data()));
