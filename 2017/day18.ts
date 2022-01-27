import data from './day18_input.ts';
// import data from './day18_sample.ts';

const M: Record<string, number> = {};
const arr = data().split('\n');

let getVal = (n: string | number) => (isNaN(Number(n)) ? M[n] : Number(n));

let i = 0;
let send;
let rcv;
while (arr[i]) {
    let [op, x, y] = arr[i].split(' ');
    // console.log(i, arr[i], M, send);
    if (op === 'snd') send = M[x] || 0;
    if (op === 'set') M[x] = getVal(y);
    if (op === 'add') M[x] = (M[x] || 0) + getVal(y);
    if (op === 'mul') M[x] = (M[x] || 0) * getVal(y);
    if (op === 'mod') M[x] = (M[x] || 0) % getVal(y);
    if (op === 'rcv' && M[x] !== 0) {
        rcv = M[x];
        console.log(send);
        break;
    }
    if (op === 'jgz' && M[x] > 0) i += getVal(y);
    else i++;
}
