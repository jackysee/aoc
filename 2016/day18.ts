import data from './day18_input.ts';
// const data = () => '.^^.^.^^^^';

function safeTile(n: number) {
    const arr = [data().split('')];
    let count = 0;
    for (let i = 0; i < n - 1; i++) {
        let last = arr.shift()!;
        count += last.filter((c) => c === '.').length;
        let row = last.map((c, i, a) => {
            let s = [a[i - 1] || '.', c, a[i + 1] || '.'].join('');
            return ['^^.', '.^^', '^..', '..^'].includes(s) ? '^' : '.';
        });
        arr.push(row);
    }
    count += arr.shift()!.filter((c) => c === '.').length;
    return count;
}

console.log('Part 1', safeTile(40));
console.log('Part 2', safeTile(400000));
