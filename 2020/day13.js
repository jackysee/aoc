function parse(str) {
    let [t, buses] = str.split("\n");
    return {
        t: parseInt(t, 10), 
        buses: buses.split(",")
            .map(x => x === 'x'?'x':parseInt(x, 10))
    };
}

function part1(str) {
    const d = parse(str);
    let min, idx = 0;
    d.buses.forEach((v, i) => {
        if(v === 'x')
            return;
        v = v - (d.t % v);
        if(min === undefined || v < min) {
            min = v;
            idx = i;
        }
    });
    return min * d.buses[idx];
}

console.log(part1(data()));

function lcm(...arr) {
    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    const _lcm = (x, y) => (x * y) / gcd(x, y);
    return [...arr].reduce((a, b) => _lcm(a, b));
}

function crt(num, rem) {
    let sum = 0;
    const prod = num.reduce((a, c) => a * c, 1);

    for (let i = 0; i < num.length; i++) {
        const [ni, ri] = [num[i], rem[i]];
        const p = Math.floor(prod / ni);
        sum += ri * p * mulInv(p, ni);
    }
    return sum % prod;
}
 
function mulInv(a, b) {
    const b0 = b;
    let [x0, x1] = [0, 1];

    if (b === 1) {
        return 1;
    }
    while (a > 1) {
        const q = Math.floor(a / b);
        [a, b] = [b, a % b];
        [x0, x1] = [x1 - q * x0, x0];
    }
    if (x1 < 0) {
        x1 += b0;
    }
    return x1;
}
/*
 * n % b1 = r1
 * n % b2 = r2
 *
 */
function part2(str) {
    let { buses } = parse(str);
    let first, idx; 
    buses = buses.map((b, i) => {
        if(first === undefined && b !== 'x') {
            first = b;
            idx = i;
        }
        return b == 'x'
            ? [b, -1]
            : [b, b - (i - idx + 1)]
    }).filter(b => b[0] !== 'x'); 
    let a = [], n = [];
    for (var i = 0, len = buses.length; i < len; i++) {
        a[i] = buses[i][0];
        n[i] = buses[i][1];
    }
    console.log(a, n);
    return crt(a, n) + 1;
}

console.log(part2('0\n7,13,x,x,59,x,31,19')); //106871
console.log(part2(sample1())); //3417
console.log(part2(`0\n67,7,59,61`));
console.log(part2(`0\n67,x,7,59,61`));
console.log(part2('0\n67,7,x,59,61'));
console.log(part2('0\n1789,37,47,1889'));
console.log(part2(data()));




function sample1() {
    return `0
17,x,13,19`;
}


function data() {
    return `1000655
17,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,571,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,x,x,x,x,23,x,x,x,x,x,29,x,401,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,19`;
}
