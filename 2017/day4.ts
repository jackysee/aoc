import data from './day4_input.ts';
let arr: string[] = data().split('\n');

const noDuplicate = (l: string) => {
    let words = l.split(/\s+/);
    return words.length === new Set(words).size;
};
console.log('Part 1', arr.filter(noDuplicate).length);

const noAnagram = (l: string) => {
    let words = l.split(/\s+/).map((s) => s.split('').sort().join(''));
    return words.length === new Set(words).size;
};
console.log('Part 2', arr.filter(noDuplicate).filter(noAnagram).length);
