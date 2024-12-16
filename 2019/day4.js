//AOC2019 D4
// noprotect
var input = '193651-649729';
var [n, m] = input.split('-').map(s => parseInt(s, 10));

const notDecreasing = s => s.split('').map(s => parseInt(s,10)).sort().join('') === s;

var result = [];
for(let i=n; i<=m; i++) {
    var s = i+'';
    if (
        /(00|11|22|33|44|55|66|77|88|99)/.test(s) &&
        notDecreasing(s)
    )
        result.push(s);
        
}
console.log(result.length);

const hasDouble = s => {
    return '0123456789'.split('').find(l => {
        return new RegExp(l+l).test(s) && !new RegExp(l+l+l).test(s)
    }) !== undefined;
}

result = [];
for(let i=n; i<=m; i++) {
    var s = i+'';
    if (hasDouble(s) && notDecreasing(s))
        result.push(s);
        
}
console.log(result.length);
