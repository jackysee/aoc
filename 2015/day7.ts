import data from './day7_input.ts';

let arr: string[] = data().split('\n');

function run(b?:number) {
    const W: { [key: string]: number } = {};
    const get = (k: string) => (/^\d+$/.test(k)) ? Number(k) : W[k];
    const has = (k: string) => get(k) !== undefined;
    while (true) {
        arr.forEach((l) => {
            let [op, target] = l.split(' -> ');
            if (has(target)) return;
            let [A, B, C] = op.split(' ');
            if (A === 'NOT' && has(B)) {
                W[target] = ~get(B) + 65536;
            }
            if (B === 'AND' && has(A) && has(C)) {
                W[target] = get(A) & get(C);
            }
            if (B === 'OR' && has(A) && has(C)) {
                W[target] = get(A) | get(C);
            }
            if (B === 'LSHIFT' && has(A) && has(C)) {
                W[target] = get(A) << get(C);
            }
            if (B === 'RSHIFT' && has(A) && has(C)) {
                W[target] = get(A) >> get(C);
            }
            if(!B && !C) {
                if(target === 'b' && b !== undefined) {
                    W[target] = b;
                } else {
                    W[target] = get(A);
                }
            }
        });
        if (W.a) return W.a
    }
}

let a = run();
console.log('Part 1', a);
console.log('Part 2', run(a));
