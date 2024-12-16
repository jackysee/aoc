import data from './day21_input.ts';
// import data from './day21_sample.ts';

type Monkey = {
    m1?: string;
    m2?: string;
    value?: number | boolean;
    v1?: number;
    v2?: number;
    op?: string;
};
const M: Record<string, Monkey> = {};
data()
    .split('\n')
    .forEach((line) => {
        const [monkey, job] = line.split(': ');
        if (/\d+/.test(job)) M[monkey] = { value: Number(job) };
        else {
            const [m1, op, m2] = job.split(' ');
            M[monkey] = { m1, m2, op };
        }
    });

const clone = (M: Record<string, Monkey>) =>
    Object.fromEntries(Object.entries(M).map(([k, v]) => [k, { ...v }]));

const yell = (_M: Record<string, Monkey>) => {
    const M = clone(_M);
    while (true) {
        for (const m in M) {
            const job = M[m];
            if (job.value !== undefined) continue;
            job.v1 = M[job.m1!].value as number;
            job.v2 = M[job.m2!].value as number;
        }
        for (const m in M) {
            const job = M[m];
            if (job.value !== undefined) continue;
            if (job.v1 !== undefined && job.v2 !== undefined) {
                if (job.op === '+') job.value = job.v1 + job.v2;
                if (job.op === '-') job.value = job.v1 - job.v2;
                if (job.op === '*') job.value = job.v1 * job.v2;
                if (job.op === '/') job.value = job.v1 / job.v2;
                if (job.op === '=') job.value = job.v1 === job.v2;
            }
        }
        if (M.root.value !== undefined) {
            return M.root;
        }
    }
};
console.log(yell(M).value);

M.root.op = '=';
let low = 0;
let high = 10000000000000;
while (true) {
    const mid = Math.floor((high + low) / 2);
    M.humn.value = mid;
    const result = yell(M);
    if (result.value === true) {
        console.log(M.humn.value);
        break;
    }
    if (result.v1! > result.v2!) {
        low = mid;
    } else {
        high = mid;
    }
}
