//AOC2019 D12

function parseElementQty(s) {
    var m = s.match(/^(\d+) (\w+)$/);
    return { el: m[2], qty: parseInt(m[1], 10) }
}
function parse(str) {
    const entries = str.split('\n').map(l => {
        let [_requires, _target] = l.split(' => ');
        let requires = _requires.split(',').map(s => s.trim()).map(parseElementQty);
        var target = parseElementQty(_target);
        return [
            target.el, 
            { 
                qty: target.qty, 
                requires,
                tip: requires.length === 1 && requires[0].el === 'ORE'
            }
        ]
    });
    return Object.fromEntries(entries);
}
/*

1 FUEL
 - 2 AB
    - 3 A (6) => 18 * 2 ORE
    - 4 B
 - 3 BC
    - 5 B (15)
    - 7 C
 - 4 AC
    - 4 C (16)
    - 1 A (4) => 9 * 4 ORE

36 ORE * 2 = 72 ORE
but if count 10A => 45 ORE

 *
    * */
function findORE(str) {
    console.log(str);
    var map = parse(str);
    var els = {};
    
    // 3ORE = 2A
    // 7A => 3C
    // 7C => 1 FUEL
    // 1 FUEL => 3 * 4 * 3
    // 1 * walk(C, 7)
    // 1 * 3 * walk(A, 7)
    // 1 * 3 * 4 * 3 
    function walk(target, _qty) {
        var { qty, requires } = map[target];
        qty = Math.ceil(_qty / qty);
        console.log('qty:', qty);
        if(requires[0].el === 'ORE') {
            els[target] = els[target] ?? 0;
            els[target] += qty;
            return;
        }
        requires.forEach(r=>  {
            console.log(target, ':walk', r.el, r.qty); 
            return walk(r.el, r.qty); 
        });
        // return rootEls;
    }
    return walk('FUEL', 1);
    // return rootEls;
    // console.log(rootEls);
    // return Object.entries(rootEls).reduce((a, [el, qty]) => {
    //     var _el = map[el];
    //     return a + Math.ceil(qty / _el.qty) * _el.requires[0].qty;
    // }, 0);
}

// console.log(findORE(sample4())); //36 ORE
console.log(findORE(sample0())); //31 ORE
// console.log(findORE(sample1()));
// console.log(findORE(sample2()));
// console.log(findORE(sample3()));
// console.log(findORE(data()));

function sample4() {
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
