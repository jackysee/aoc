import data from './day18_input.ts';

const arr = data()
    .split('\n')
    .map((l) => l.split(' '));

function createPg(id: number = 0, send: Function) {
    const M: Record<string, number> = {};
    const getVal = (n: string | number) => /[a-z]/.test(n+'') ? (M[n] || 0) : +n;
    let i = 0;
    let queue: number[] = [];
    let sent = 0;
    M.p = id;
    function run() {
        if(arr[i]?.[0] === 'rcv' && !queue.length) console.log('halted')
        if(queue.length && queue.join(',') === [...queue].sort((a,b)=>b-a).join(',')) console.log('sorted')
        if (!arr[i] || (arr[i][0] === 'rcv' && !queue.length)) return false;
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

            if(!arr[i]) console.log('terminated')
        }
    }
    return {
        run,
        queue,
        get sent() {
            return sent;
        },
        get i() {
            return i;
        },
        push(v:number) { 
            // if(!arr[i]) return;
            queue.push(v)
        }
    };
}

let sendVal;
const pg = createPg(0, (v: number) => (sendVal = v));
pg.run();
console.log('Part 1', sendVal);

const pg1 = createPg(0, (v: number) => pg2.push(v));
const pg2 = createPg(1, (v: number) => pg1.push(v));
while (true) {
    console.log('--------');
    console.log('before pg1', [pg1.i, pg1.queue.length], [pg2.i, pg2.queue.length]);
    pg1.run();
    if (!pg1.queue.length && !pg2.queue.length) break;
    console.log('before pg2', [pg1.i, pg1.queue.length], [pg2.i, pg2.queue.length]);
    pg2.run();
    if (!pg1.queue.length && !pg2.queue.length) break;
    console.log('sent', pg1.sent, [pg1.i, pg1.queue.length], [pg2.i, pg2.queue.length]);
}
console.log('Part 2', pg1.sent);
