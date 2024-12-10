import data from './day9_input.ts';
// const data = () => '{{<<!<>},{<!{>},{<!>>},{<!}>},{!!}, <{}>}'; //11
// const data = () => '{{{},{},{{}}}}'; //16
// const data = () => '{<a>,<a>,<a>,<a>}'; //1
// const data = () => '{{<a!>},{<a!>},{<a!>},{<ab>}}'; //3
// const data = () => '{{<!!>},{<!!>},{<!!>},{<!!>}}'; //9

let score = 0;
let level = 0;
let i = 0;
let inGarbage = false;
let ignoreNext = false;
let count = 0;
let arr = data().split('');
while (i < arr.length) {
    let c = arr[i];
    if (ignoreNext) {
        ignoreNext = false;
        i++;
        continue;
    }
    if (c === '!') {
        ignoreNext = true;
        i++;
        continue;
    }
    if (inGarbage && c !== '>') {
        count++;
        i++;
        continue;
    }
    if (c === '{') {
        level += 1;
        score += level;
    }
    if (c === '}') level -= 1;
    if (!inGarbage && c === '<') inGarbage = true;
    if (inGarbage && c === '>') inGarbage = false;
    i++;
}

console.log('Part 1', score);
console.log('Part 2', count);
