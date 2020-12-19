//AOC2019 D16

//base 0,1,0,-1
function getPatternValue(repeatIdx, posIdx, len) {
    let base = [0,1,0,-1];
    let repeat = repeatIdx + 1;
    let remain = (posIdx + 1) % (repeat * 4);
    let idx = Math.floor( remain / repeat % 4);
    return base[idx];
}

function fft(str) {
    var result = '';
    for(let i=0; i<=str.length; i++) { //element
        let total = 0;
        for(let j=i; j<str.length; j++) { //digit
            total += parseInt(str[j], 10) * getPatternValue(i,j);
        }
        result += Math.abs(total % 10)+'';
    }
    return result;
}

function part1(str) {
    for(let i=0; i<100; i++) {
        str = fft(str);
    }
    return str.slice(0, 8);
}

// console.log(part1('80871224585914546619083218645595')); //24176176.
// console.log(part1('19617804207202209144916044189917')); //73745418.
// console.log(part1('69317163492948606335995924319873')); //52432133.
console.log(part1(data(), 100).slice(0,8));

//take advantage of the fact that offset > data length / 2, so it's just 0000000 111111
function fft2(str) {
    let result = '';
    let sum = 0;
    for(let i=str.length-1; i>=0; i--) {
        let n = parseInt(str[i], 10);
        sum += n;
        result = (Math.abs(sum % 10)+'') + result;
    }
    return result;
}

function part2(_str) {
    let from = parseInt(_str.substring(0, 7), 10);
    let to = from + 8;
    let str = Array(10000).fill(_str).flat().join('').slice(from);
    for(let i=0; i<100; i++) {
        str = fft2(str, from, to);
    }
    return str.slice(0, 8);
    // return result.slice(from, to);
}

// console.log(part2('03036732577212944063491565474664')); //becomes 84462026.
// console.log(part2('02935109699940807407585447034323')); //becomes 78725270.
// console.log(part2('03081770884921959731165446850517')); //becomes 53553731.
console.log(part2(data()));

function data() {
    return `59767332893712499303507927392492799842280949032647447943708128134759829623432979665638627748828769901459920331809324277257783559980682773005090812015194705678044494427656694450683470894204458322512685463108677297931475224644120088044241514984501801055776621459006306355191173838028818541852472766531691447716699929369254367590657434009446852446382913299030985023252085192396763168288943696868044543275244584834495762182333696287306000879305760028716584659188511036134905935090284404044065551054821920696749822628998776535580685208350672371545812292776910208462128008216282210434666822690603370151291219895209312686939242854295497457769408869210686246`;
}
