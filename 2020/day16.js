//AOC2020 D16
import data from './day16_input.js';

function parse(str) {
    let [_rules, _my, _nearby] = str.split(/\n\n+/);
    const rules = _rules.split('\n').map((l) => {
        let [field, _range] = l.split(':');
        let ranges = _range.split(' or ').map((r) => {
            let [_, from, to] = r.match(/(\d+)-(\d+)/);
            return { from: parseInt(from, 10), to: parseInt(to, 10) };
        });
        let valid = (n) => {
            return ranges.some((r) => n >= r.from && n <= r.to);
        };
        return { field, valid, ranges };
    });
    const intList = (s) => s.split(',').map((s) => parseInt(s, 10));
    const my = intList(_my.split('\n')[1]);
    const nearby = _nearby.split('\n').slice(1).map(intList);
    return { rules, my, nearby };
}

function part1(str) {
    var d = parse(str);
    return d.nearby
        .reduce((a, c) => {
            return [...a, ...c.filter((n) => !d.rules.some((r) => r.valid(n)))];
        }, [])
        .reduce((a, c) => a + c, 0);
}

// console.log(part1(sample()));
console.log(part1(data()));

function reducePossibleFields(fields) {
    var lastSingle;
    while (true) {
        var singles = fields.filter((arr) => arr.length === 1).flat();
        if (!singles.length || lastSingle === singles.join(',')) {
            break;
        }
        lastSingle = singles.join(',');
        fields = fields.map((arr) =>
            arr.length === 1 ? arr : arr.filter((f) => !singles.includes(f))
        );
    }
    return fields;
}

function getFields(d) {
    var tickets = [d.my, ...d.nearby];
    var len = d.my.length;
    var idx = 0,
        fields = [];
    while (idx < len) {
        var values = tickets.map((t) => t[idx]);
        var possibleFields = d.rules
            .filter((r) => values.every((v) => r.valid(v)))
            .map((d) => d.field)
            .filter(
                (f) =>
                    !fields
                        .filter((a) => a.length === 1)
                        .flat()
                        .includes(f)
            );
        fields.push(possibleFields);
        fields = reducePossibleFields(fields);
        idx++;
    }
    return fields.flat();
}

function part2(str) {
    var d = parse(str);
    d.nearby = d.nearby.filter((c) =>
        c.every((n) => d.rules.some((r) => r.valid(n)))
    );
    var fields = getFields(d);
    return d.my
        .filter((v, i) => /^departure/.test(fields[i]))
        .reduce((a, c) => a * c, 1);
}

// console.log(getFields(parse(sample2())));
console.log(part2(data()));

function sample() {
    return `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;
}

function sample2() {
    return `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`;
}
