//AOC2019 D14
import data from './day14_input.js';

function parseElementQty(s) {
    var m = s.match(/^(\d+) (\w+)$/);
    return { el: m[2], qty: parseInt(m[1], 10) };
}

function parse(str) {
    const entries = str.split('\n').map((l) => {
        let [_requires, _target] = l.split(' => ');
        let requires = _requires
            .split(',')
            .map((s) => s.trim())
            .map(parseElementQty);
        var target = parseElementQty(_target);
        return [target.el, { qty: target.qty, requires }];
    });
    return Object.fromEntries(entries);
}

function findORE(str, qty = 1) {
    var map = parse(str);
    var els = {};

    function find(target, qty) {
        if (target === 'ORE') {
            return qty;
        }
        const el = map[target];
        els[target] = els[target] === undefined ? 0 : els[target];
        let remain = els[target];
        let _qty = Math.ceil((qty - remain) / el.qty);
        els[target] += el.qty * _qty - qty;
        return el.requires.reduce((a, e) => {
            return a + find(e.el, _qty * e.qty);
        }, 0);
    }
    let result = find('FUEL', qty);
    return result;
}

// console.log(findORE(sample5())); //33 ORE
// console.log(findORE(sample0())); //31 ORE
// console.log(findORE(sample1())); //165 ORE
// console.log(findORE(sample2())); //13312 ORE
// console.log(findORE(sample3())); //180679 ORE
// console.log(findORE(sample4())); //2210736 ORE
console.log(findORE(data()));

//sample2 => 13312 ORE-per-FUEL => 82892753 FUEL
const TRI = 1000000000000;
function findFUEL(str) {
    let orePerFuel = findORE(str);
    let minFuel = Math.floor(TRI / orePerFuel);
    let minOre = findORE(str, minFuel);
    let maxFuel = Math.floor((TRI * minFuel) / minOre);
    let maxOre = findORE(str, maxFuel);
    while (maxOre < TRI) {
        maxFuel++;
        maxOre = findORE(str, maxFuel);
    }
    return maxFuel - 1;
}
// console.log(findFUEL(sample2())); //82892753
// console.log(findFUEL(sample3())); //5586022
// console.log(findFUEL(sample4())); //460664
console.log(findFUEL(data()));
// console.log(findORE(data(), 5194174));

function sample5() {
    return `3 ORE => 2 A
7 A => 3 C
7 C => 1 FUEL`;
}

function sample0() {
    //31 ORE
    return `10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL`;
}

function sample1() {
    //165 ORE
    return `9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL`;
}

// 1 FULE => 5 KHKGT =>
function sample2() {
    //13312
    return `157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`;
}

function sample3() {
    return `2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
17 NVRVD, 3 JNWZP => 8 VPVL
53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
22 VJHF, 37 MNCFX => 5 FWMGM
139 ORE => 4 NVRVD
144 ORE => 7 JNWZP
5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
145 ORE => 6 MNCFX
1 NVRVD => 8 CXFTF
1 VJHF, 6 MNCFX => 4 RFSQX
176 ORE => 6 VJHF`;
}

function sample4() {
    return `171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX`;
}
