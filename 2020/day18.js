//AOC2020 D18
import data from './day18_input.js';

function getExpr(str) {
    var parens = 0,
        from,
        to;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            if (parens == 0) {
                from = i;
            }
            parens += 1;
        }
        if (str[i] === ')') {
            parens -= 1;
            if (parens === 0) {
                return [str.substring(from + 1, i), from + 1, i];
            }
        }
    }
}

function evaluateAllExpr(str, fn) {
    while (true) {
        var expr = getExpr(str);
        if (!expr) break;
        let [_expr, from, to] = expr;
        str = str.substring(0, from - 1) + fn(_expr) + str.substring(to + 1);
    }
    return str;
}

function evaluate(_str) {
    var str = _str
        .split('')
        .filter((c) => c.trim())
        .join('');
    str = evaluateAllExpr(str, evaluate);
    var initial = parseInt(str.match(/^\d+/)[0], 10);
    return str.match(/([\+\*])\d+/g).reduce((a, c) => eval(a + c), initial);
}

// console.log(evaluate('2 + 3 * 4 + 5')); //25
// console.log(evaluate('2 * 3 + (4 * 5)')); //26
// console.log(evaluate('5 + (8 * 3 + 9 + 3 * 4 * 3)')); //437.
// console.log(evaluate('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')); // 12240.
// console.log(evaluate('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')); // 13632.
// console.log(evaluate(`6 * 7 * 8 * 9 * ((8 * 3 * 9) * 7 + 2 + 4 * 8 + 2) + 5`));  //36729509

console.log(
    data()
        .split('\n')
        .reduce((a, c) => a + evaluate(c), 0)
);

function evaluate2(_str) {
    var str = _str
        .split('')
        .filter((n) => n.trim())
        .join('');
    str = evaluateAllExpr(str, evaluate2);
    return str.split('*').reduce((a, c) => a * eval(c), 1);
}

// console.log(evaluate2('2 + 3 * 4 + 5')); //5 * 9 = 45
// console.log(evaluate2('1 + (2 * 3) + (4 * (5 + 6))')); //51.
// console.log(evaluate2('2 * 3 + (4 * 5)')); //46.
// console.log(evaluate2('5 + (8 * 3 + 9 + 3 * 4 * 3)')); //1445.
// console.log(evaluate2('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')); //669060.
// console.log(evaluate2('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')); //23340.

console.log(
    data()
        .split('\n')
        .reduce((a, c) => a + evaluate2(c), 0)
);
