import data from './day19_input.ts';
// import data from './day19_sample.ts';
type Part = Record<string, number>;
type Condition = {
    c?: string;
    op?: string;
    val?: number;
    dest: string;
    not?: boolean;
};

const [workflows, _parts] = data().split('\n\n');
const W: Record<string, Condition[]> = {};
workflows.split('\n').map((l) => {
    const [_, name, _conditions] = l.match(/(\w+)\{(.*)\}/)!;
    const conditions = _conditions.split(',').map((s) => {
        if (s.includes(':')) {
            const [_c, dest] = s.split(':');
            const [_, c, op, val] = _c.match(/([xmas])([<>])(\d+)/)!;
            return { c, op, val: +val, dest };
        } else {
            return { dest: s };
        }
    });
    W[name] = conditions;
});

const parts = _parts.split('\n').map((s) => {
    return [...s.matchAll(/\w+=\d+/g)].reduce((a, c) => {
        const [k, v] = c[0].split('=');
        a[k] = +v;
        return a;
    }, {} as Part);
});

const testPartByWorkFlow = (part: Part, name: string) => {
    for (const { c, op, val, dest } of W[name]) {
        if (op === '<' && part[c!] < val!) return dest;
        if (op === '>' && part[c!] > val!) return dest;
        if (!op) return dest;
    }
    return undefined;
};

const accepted = (part: Part) => {
    let dest = 'in';
    while (dest !== 'A' && dest !== 'R') {
        dest = testPartByWorkFlow(part, dest)!;
    }
    return dest === 'A';
};

console.log(
    'A',
    parts.reduce((a, p) => {
        if (accepted(p)) a += Object.values(p).reduce((a, b) => a + b, 0);
        return a;
    }, 0)
);

const WE = Object.entries(W);
const getConditionsByDest = (dest: string) => {
    const arr: Condition[][] = [];
    WE.forEach(([name, conds]) => {
        conds.forEach((c, i) => {
            if (c.dest === dest) {
                const _conds = conds
                    .slice(0, i + 1)
                    .map((c) => ({ ...c, not: true }));
                _conds[_conds.length - 1].not = false;
                if (name === 'in') {
                    arr.push(_conds);
                } else {
                    getConditionsByDest(name).forEach((prev_conds) => {
                        arr.push([...prev_conds, ..._conds]);
                    });
                }
            }
        });
    });
    return arr;
};

const getCombinations = (conds: Condition[]) => {
    const p: Record<string, number[]> = {
        x: [1, 4000],
        m: [1, 4000],
        a: [1, 4000],
        s: [1, 4000]
    };
    for (let i = 0; i < conds.length; i++) {
        const { c, op, val, not } = conds[i];
        if (!c) continue;
        if (!not) {
            if (op === '>') p[c][0] = Math.max(val! + 1, p[c][0]);
            if (op === '<') p[c][1] = Math.min(val! - 1, p[c][1]);
        } else {
            if (op === '>') p[c][1] = Math.min(val!, p[c][1]);
            if (op === '<') p[c][0] = Math.max(val!, p[c][0]);
        }
    }
    return Object.values(p).reduce((a, c) => a * (c[1] - c[0] + 1), 1);
};

console.log(
    'B',
    getConditionsByDest('A').reduce((a, conds) => a + getCombinations(conds), 0)
);
