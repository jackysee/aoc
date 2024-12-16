import data from './day1_input.js';
var arr = data()
    .split(/\n/)
    .map((n) => parseInt(n, 10));

loop: for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
        if (arr[i] + arr[j] === 2020) {
            console.log(arr[i] * arr[j]);
            break loop;
        }

loop: for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
        for (let k = j + 1; k < arr.length; k++)
            if (arr[i] + arr[j] + arr[k] === 2020) {
                console.log(arr[i] * arr[j] * arr[k]);
                break loop;
            }
