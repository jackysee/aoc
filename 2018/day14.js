import data from './day14_input.js';

function solve(times) {
    let len = times.length;
    let n = Number(times);
    let arr = [3, 7];
    let temp = arr.join('');
    let [a, b] = [0, 1];
    let t = 0;
    let part1 = false;
    loop: while (true) {
        let A = arr[a];
        let B = arr[b];
        let sum = ('' + (A + B)).split('');
        for (let i = 0; i < sum.length; i++) {
            temp += sum[i];
            temp = temp.substring(temp.length - len);
            if (temp === times) {
                console.log(arr.length + i + 1 - len);
                break loop;
            }
        }
        t += sum.length;
        arr.push(...sum.map(Number));
        a = (a + A + 1) % arr.length;
        b = (b + B + 1) % arr.length;
        if (t >= n + 10 && !part1) {
            console.log(arr.slice(n, n + 10).join(''));
            part1 = true;
        }
    }
}

// solve('51589');
// solve('01245');
// solve('92510');
// solve('59414');
solve(data());
