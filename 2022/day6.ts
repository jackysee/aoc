import data from './day6_input.ts';
const arr = data().split('');
function find(len: number) {
    let i = len;
    while (i <= arr.length) {
        if (new Set(arr.slice(i - len, i)).size === len) break;
        i++;
    }
    return i;
}

console.log(find(4));
console.log(find(14));
