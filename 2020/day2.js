import data from './day2_input.js';
var list = data()
    .split(/\n/)
    .map((n) => n.match(/^(\d+)-(\d+) (\w): (.*)$/).slice(1));

var part1 = list.filter(([from, to, letter, pwd]) => {
    var count = pwd.split('').filter((c) => c === letter).length;
    return count >= parseInt(from, 10) && count <= parseInt(to, 10);
});

console.log(part1.length);

var part2 = list.filter(([from, to, letter, pwd]) => {
    var arr = pwd.split('');
    var c1 = arr[parseInt(from, 10) - 1];
    var c2 = arr[parseInt(to, 10) - 1];
    return (
        (c1 === letter || c2 === letter) && !(c1 === letter && c2 === letter)
    );
});

console.log(part2.length);
