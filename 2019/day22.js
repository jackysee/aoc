//AOC2019 D22

function parse(s) {
    return s.split('\n').map(l => {
        if(/new stack/.test(l)) {
            return { action: 'new' };
        }
        if(/^cut/.test(l)) {
            return { action: 'cut', val: parseInt(l.match(/-?\d+/)[0], 10) };
        }
        if(/^deal with/.test(l)) {
            return { action: 'deal', val: parseInt(l.match(/\d+/)[0], 10)}
        }
    });
}

function shuffle(str, noOfCards) {
    let ins = parse(str);
    let cards = [];
    for(let i=0; i<noOfCards; i++) {
        cards.push(i);
    }
    ins.forEach(({ action, val }) => {
        if(action === 'new') {
            cards = cards.reverse();
        }
        if(action === 'cut') {
            cards = cards.slice(val).concat(cards.slice(0, val));
        }
        if(action === 'deal') {
            // console.log('deal === ', val);
            let pos = 0;
            let len = cards.length;
            let _cards = [];
            while(true) {
                let n = cards.shift();
                if(n === undefined) break;
                _cards[pos] = n;
                // console.log(pos);
                pos = pos + val;
                if(pos >= noOfCards) {
                    // console.log({ _pos: pos - noOfCards });
                    pos = pos - noOfCards;
                } 
            }
            cards = _cards;
        }
    });
    return cards;
}

// function pow( base, exp, mod ){
//     if (exp == 0) return 1;
//     if (exp % 2 == 0) return Math.pow( pow( base, (exp / 2), mod), 2) % mod;
//     return (base * pow( base, (exp - 1), mod)) % mod;
// }
function pow(a, b, n) {
    a = a % n;
    var result = 1n;
    var x = a;
    while(b > 0){
        var leastSignificantBit = b % 2n;
        b = b / 2n;
        if (leastSignificantBit == 1n) {
            result = result * x;
            result = result % n;
        }
        x = x * x;
        x = x % n;
    }
    return result;
}


/*
shuffles = { 'deal with increment ': lambda x,m,a,b: (a*x %m, b*x %m),
         'deal into new stack': lambda _,m,a,b: (-a %m, (m-1-b)%m),
         'cut ': lambda x,m,a,b: (a, (b-x)%m) }
a,b = 1,0
with open('2019/22/input.txt') as f:
  for s in f.read().strip().split('\n'):
    for name,fn in shuffles.items():
      if s.startswith(name):
        arg = int(s[len(name):]) if name[-1] == ' ' else 0
        a,b = fn(arg, m, a, b)
        break
r = (b * pow(1-a, m-2, m)) % m
print(f"Card at #{pos}: {((pos - r) * pow(a, n*(m-2), m) + r) % m}")
*/

function cardAt(str, pos, len, times) {
    let ins = parse(str);
    let a = 1n, b = 0n;
    ins.forEach(({ action, val }) => {
        let x = val !== undefined ? BigInt(val) : 0n;
        if(action === 'deal') {
            a = a * x % len;
            b = b * x % len;
        }
        if(action === 'new') {
            a = -a % len;
            b = (len - 1n - b) % len;
        }
        if(action === 'cut') {
            b = (b - x) % len;
        }
    });
    let r = (b * pow(1n-a, len-2n, len)) % len;
    return ((pos - r) * pow(a, times*(len-2n), len) + r) % len;
}

// console.log(shuffle(sample1(), 10)); // 9 2 5 8 1 4 7 0 3 6
// console.log(shuffle(sample2(), 10)); // 6 3 0 7 4 1 8 5 2 9
// console.log(shuffle(sample3(), 10)); // Result: 3 0 7 4 1 8 5 2 9 6
// console.log(shuffle(sample4(), 10)); // Result: 0 3 6 9 2 5 8 1 4 7

// console.log(shuffle(`deal with increment 3`, 40)); //.sort((a, b) => a - b));

console.log(shuffle(data(), 10007).indexOf(2019));

// console.log(cardAt(data(), 3074n, 10007n, 1n));
console.log(cardAt(data(), 2020n, 119315717514047n, 101741582076661n));


function sample4() {
    return `
deal with increment 7
deal into new stack
deal into new stack
    `.trim();
}

function sample3() {
    return `
cut 6
deal with increment 7
deal into new stack
    `.trim();
}

function sample2() {
    return `
deal with increment 7
deal with increment 9
cut -2
    `.trim();
    
}


function sample1() {
    return `
deal into new stack
cut -2
deal with increment 7
cut 8
cut -4
deal with increment 7
cut 3
deal with increment 9
deal with increment 3
cut -1
    `.trim();
}

function data() {
    return `
deal with increment 54
cut -667
deal with increment 15
cut -1826
deal with increment 55
cut -8444
deal with increment 44
cut 910
deal with increment 63
cut 4025
deal with increment 45
cut 6430
deal with increment 53
cut -3727
deal into new stack
deal with increment 6
cut -5464
deal into new stack
deal with increment 48
cut 6238
deal with increment 23
cut 8614
deal with increment 50
cut -987
deal with increment 26
cut -9808
deal with increment 47
cut -8088
deal with increment 5
deal into new stack
cut 5787
deal with increment 49
cut 795
deal with increment 2
cut -536
deal with increment 26
deal into new stack
cut -6327
deal with increment 63
cut 2511
deal with increment 38
cut -2622
deal into new stack
deal with increment 9
cut 8201
deal into new stack
deal with increment 48
cut -2470
deal with increment 19
cut 8669
deal into new stack
deal with increment 28
cut -2723
deal into new stack
deal with increment 15
cut -5101
deal into new stack
cut 464
deal with increment 68
cut 2695
deal with increment 53
cut -8523
deal with increment 32
cut -1018
deal with increment 66
cut 9127
deal with increment 3
deal into new stack
deal with increment 14
cut 725
deal into new stack
cut -2273
deal with increment 65
cut 6306
deal with increment 55
cut -6710
deal with increment 54
cut 7814
deal with increment 23
cut 8877
deal with increment 60
cut 3063
deal with increment 40
cut -2104
deal with increment 72
cut -4171
deal with increment 21
cut 7919
deal with increment 53
cut -3320
deal with increment 49
deal into new stack
cut -8201
deal into new stack
deal with increment 54
deal into new stack
cut 6321
deal with increment 50
cut 7244
deal with increment 23
    `.trim();
}
