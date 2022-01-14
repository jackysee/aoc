import data from './day23_input.ts';
// import data from './day23_sample.ts';

interface Instruction {
    op: string;
    reg?: string;
    offset?: number;
}

let arr: Instruction[] = data()
    .split('\n')
    .map((l) => {
        let op = l.match(/^(\w+)/)![0];
        let m_reg = l.match(/a|b/);
        let reg = m_reg ? m_reg[0] : undefined;
        let m_offset = l.match(/[\+\-]\d+/);
        let offset = m_offset ? Number(m_offset) : undefined;
        return { op, reg, offset };
    });

function run(r: Record<string, number>) {
    let idx = 0;
    while (arr[idx]) {
        let { op, reg, offset } = arr[idx];
        if (op === 'hlf') r[reg!] /= 2;
        if (op === 'tpl') r[reg!] *= 3;
        if (op === 'inc') r[reg!] += 1;
        if (!/^j/.test(op)) idx += 1;
        if (op === 'jmp') idx += offset!;
        if (op === 'jie') idx += r[reg!] % 2 === 0 ? offset! : 1;
        if (op === 'jio') idx += r[reg!] % 2 === 1 ? offset! : 1;
        console.log(op, reg, offset || '', r, idx);
    }
    return r;
}

console.log(arr);

console.log(run({ a: 0, b: 0 }));
