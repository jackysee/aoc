import data from './day6_input.ts';
let arr: string[] = data().split('\n');
let result1 = [];
let result2 = [];
for (let i = 0; i < arr[0].length; i++) {
    let S: Record<string, number> = {};
    for (let j = 0; j < arr.length; j++) {
        let c = arr[j][i];
        S[c] = (S[c] || 0) + 1;
    }
    let sorted = Object.entries(S).sort((a, b) => b[1] - a[1]);
    result1.push(sorted[0][0]);
    result2.push(sorted.at(-1)![0]);
}
console.log('Part 1', result1.join(''));
console.log('Part 2', result2.join(''));
