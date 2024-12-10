import data from './day18_input.ts';
const arr = data()
    .split('\n')
    .map((l) => l.split(' '));

function createPg(id: number = 0, send: Function) {
    const M: Record<string, number> = {};
    const getVal = (n: string | number) => (/[a-z]/.test(n + '') ? M[n] : +n);
    let i = 0;
    let queue: number[] = [];
    let sent = 0;
    M.p = id;
    function run() {
        while (arr[i]) {
            let [op, x, y] = arr[i];
            if (op === 'set') M[x] = getVal(y);
            if (op === 'add') M[x] += getVal(y);
            if (op === 'mul') M[x] *= getVal(y);
            if (op === 'mod') M[x] %= getVal(y);
            if (op === 'snd') {
                send(M[x] || 0);
                sent++;
            }
            if (op === 'rcv') {
                if (queue.length) M[x] = queue.shift()!;
                else break;
            }
            if (op === 'jgz' && getVal(x) > 0) i += getVal(y);
            else i++;
        }
    }
    const getSent = () => sent;
    return { run, queue, getSent };
}

let sendVal;
createPg(0, (v: number) => (sendVal = v)).run();
console.log('Part 1', sendVal);

const pg0 = createPg(0, (v: number) => pg1.queue.push(v));
const pg1 = createPg(1, (v: number) => pg0.queue.push(v));
while (true) {
    pg0.run();
    pg1.run();
    if (!pg0.queue.length && !pg1.queue.length) break;
}
console.log('Part 2', pg1.getSent());
