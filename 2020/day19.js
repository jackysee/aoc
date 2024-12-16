//AOC2020 D19
import data from './day19_input.js';

function part1(str) {
    let [rulesStr, records] = str.split('\n\n');
    records = records.split('\n');
    let rules = Object.fromEntries(
        rulesStr.split('\n').map((l) => l.split(':').map((s) => s.trim()))
    );
    let maxlen = Math.max(...records.map((s) => s.length));
    var i = 0;
    // while(i++ <= 10000) {
    while (true) {
        if (!/\d/.test(rules['0'])) {
            break;
        }
        for (let rule in rules) {
            let value = rules[rule];
            rules[rule] = value.replace(/\d+/g, function (m) {
                let target = rules[m];
                if (/\"[ab]\"/.test(target)) {
                    return target.replace(/"/g, '');
                }
                //rough count of regex matching len
                let _m = target.match(/\([ab\s]*/g);
                if (_m) {
                    let match = [..._m].join('').replace(/[\(\s]*/g, '');
                    if (match.length > maxlen) {
                        return ''; //stop here
                    }
                }
                return '(' + target + ')';
            });
        }
    }
    let validRe = new RegExp('^' + rules['0'].replace(/\s*/g, '') + '$');
    return records.filter((s) => validRe.test(s)).length;
}

console.log(part1(data()));

function part2(str) {
    str = str.replace(/\n8:[^\n]*/, '\n8: 42 | 42 8');
    str = str.replace(/\n11:[^\n]*/, '\n11: 42 31 | 42 11 31');
    return part1(str);
}

// console.log(part2(sample2()));
console.log(part2(data()));

function sample() {
    return `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`;
}

function sample2() {
    return `42: 9 14 | 10 1
9: 14 27 | 1 26
10: 23 14 | 28 1
1: "a"
11: 42 31
5: 1 14 | 15 1
19: 14 1 | 14 14
12: 24 14 | 19 1
16: 15 1 | 14 14
31: 14 17 | 1 13
6: 14 14 | 1 14
2: 1 24 | 14 4
0: 8 11
13: 14 3 | 1 12
15: 1 | 14
17: 14 2 | 1 7
23: 25 1 | 22 14
28: 16 1
4: 1 1
20: 14 14 | 1 15
3: 5 14 | 16 1
27: 1 6 | 14 18
14: "b"
21: 14 1 | 1 14
25: 1 1 | 1 14
22: 14 14
8: 42
26: 14 22 | 1 20
18: 15 15
7: 14 5 | 1 21
24: 14 1

abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa
bbabbbbaabaabba
babbbbaabbbbbabbbbbbaabaaabaaa
aaabbbbbbaaaabaababaabababbabaaabbababababaaa
bbbbbbbaaaabbbbaaabbabaaa
bbbababbbbaaaaaaaabbababaaababaabab
ababaaaaaabaaab
ababaaaaabbbaba
baabbaaaabbaaaababbaababb
abbbbabbbbaaaababbbbbbaaaababb
aaaaabbaabaaaaababaa
aaaabbaaaabbaaa
aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
babaaabbbaaabaababbaabababaaab
aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba`;
}
