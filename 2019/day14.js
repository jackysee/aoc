//AOC2019 D14

function parseElementQty(s) {
    var m = s.match(/^(\d+) (\w+)$/);
    return { el: m[2], qty: parseInt(m[1], 10) }
}

function parse(str) {
    const entries = str.split('\n').map(l => {
        let [_requires, _target] = l.split(' => ');
        let requires = _requires.split(',').map(s => s.trim()).map(parseElementQty);
        var target = parseElementQty(_target);
        return [ target.el, { qty: target.qty, requires, } ]
    });
    return Object.fromEntries(entries);
}

function findORE(str, qty = 1) {
    var map = parse(str);
    var els = {};
    
    function find(target, qty) {
        if(target === 'ORE') {
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
    let minFuel = Math.floor(TRI/ orePerFuel);
    let minOre = findORE(str, minFuel);
    let maxFuel = Math.floor(TRI * minFuel / minOre);
    let maxOre = findORE(str, maxFuel);
    while(maxOre < TRI) {
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

function sample0() { //31 ORE
    return `10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL`;
}

function sample1() { //165 ORE
    return `9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL`;
}

// 1 FULE => 5 KHKGT => 
function sample2() { //13312 
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


function data() {
    return `165 ORE => 2 PNBGW
2 FTZDF, 14 RHWGQ => 8 JTRM
1 QSKQ, 1 GPRK => 8 HKXF
2 GKLGP => 3 MTJLK
4 HXMPQ => 8 VCRLF
2 DMXC, 2 MTJLK => 8 QSKQ
39 TCLZ, 17 DKHX, 7 HVPQT, 1 DWMW, 33 THWX, 67 JVGP, 44 RDZSG, 7 JCKT, 22 TDSC, 1 QHVR => 1 FUEL
6 VCRLF, 1 HXMPQ, 6 WQSDR => 3 GKLGP
1 WLSQZ => 1 WQSDR
1 MTJLK => 2 PVSV
5 HVPQT, 4 WCTW => 8 NWGDN
3 KNTQG => 9 TCLZ
1 JTRM, 3 QSKQ, 2 RGWB => 9 RDZSG
1 MTJLK, 15 DZMQ => 6 RCPN
1 PVSV, 3 HBWDW => 7 DZMQ
1 CTKPZ, 2 HKXF => 3 RFCDH
5 QNXTS, 2 GSJNV, 1 JVGP, 10 HJTHM, 5 HKXF, 10 DZMQ => 4 JCKT
1 PNBGW => 2 HVPQT
187 ORE => 1 XLNC
16 GPRK => 6 QNXTS
1 FTZDF => 9 GPRK
9 KNTQG => 2 WCTW
35 WQSDR, 2 HVPQT => 8 RPVGN
5 RPVGN => 2 RHWGQ
1 CTKPZ, 9 QSKQ, 2 QNXTS => 5 DTFRT
1 HXMPQ, 12 VCRLF, 1 RHQH => 6 FTZDF
3 RHWGQ, 19 DZMQ, 8 FPNMC => 9 FGNK
7 RHQH, 3 HWSG => 9 HBWDW
11 QNXTS, 1 CNVKX => 8 QHVR
4 HVPQT => 6 NRLP
4 NWGDN, 1 HWSG => 2 DMXC
20 DTFRT, 4 NRLP, 1 CTKPZ => 8 HJTHM
2 BSVPD, 7 RHQH => 6 FPNMC
3 NSRB => 4 BSVPD
1 DZMQ => 3 GSJNV
2 GMNXP, 4 GSJNV, 1 ZRBR => 3 WPWM
6 RCPN => 4 CNVKX
1 NSRB => 5 RGWB
22 VCRLF => 4 NSRB
4 XLNC, 24 KNTQG => 9 WLSQZ
36 NWGDN => 2 WQZQ
5 CPMCX, 2 FGNK, 5 DTFRT => 2 ZRBR
1 CTKPZ, 1 GMNXP, 6 QNXTS => 4 KRDWH
9 RHWGQ, 16 FTZDF, 1 JVGP, 1 GMNXP, 3 HKXF, 9 DTFRT, 27 CTKPZ, 1 GKLGP => 9 DWMW
5 WQSDR, 4 NRLP, 3 TCLZ => 1 RHQH
4 NRLP => 5 GMNXP
158 ORE => 5 KNTQG
24 GMNXP, 6 JVGP, 1 BHVR, 4 KRDWH, 1 WPWM, 2 RFCDH => 7 TDSC
1 WCTW => 7 HXMPQ
10 BSVPD => 9 THWX
18 RGWB, 1 HJTHM => 3 DKHX
1 WQZQ, 4 VCRLF, 10 HVPQT => 3 CPMCX
14 BSVPD, 6 FPNMC, 5 TCLZ => 8 JVGP
4 WQZQ, 1 HXMPQ, 4 VCRLF => 3 HWSG
2 HWSG => 9 CTKPZ
4 NSRB, 1 GPRK => 4 BHVR`;
}
