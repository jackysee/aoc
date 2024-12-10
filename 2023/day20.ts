import data from './day20_input.ts';
// import { ex2 as data } from './day20_sample.ts';

type Module = {
    name: string;
    type: string;
    targets: string[];
    input: Record<string, boolean>;
    on: boolean;
};
type Signal = { source: string; dest: string; high: boolean };

const M: Record<string, Module> = {};
data()
    .split('\n')
    .forEach((l) => {
        let [name, to] = l.split(' -> ');
        const targets = to.split(', ');
        let type = 'x';
        if (/[%&]/.test(name)) {
            type = name[0];
            name = name.slice(1);
        }
        M[name] = { name, type, targets, input: {}, on: false };
    });

Object.values(M).forEach((m) => {
    m.targets.forEach((t) => {
        if (M[t]) M[t].input[m.name] = false;
    });
});

const process = (signal: Signal, module: Module) => {
    let high = signal.high;
    if (module.type === '%') {
        if (high) return [];
        high = !module.on;
        module.on = !module.on;
    }
    if (module.type === '&') {
        module.input[signal.source] = signal.high;
        high = !Object.values(module.input).every((s) => s);
    }
    return module.targets.map((dest) => ({ source: module.name, dest, high }));
};

const push = (detect?: string, state?: boolean) => {
    const startSignal = { source: 'button', dest: 'broadcaster', high: false };
    const queue = [startSignal];
    let [low, high] = [0, 0];
    while (queue.length) {
        const s = queue.shift()!;
        if (s.high) high++;
        else low++;

        if (detect) {
            if (s.dest === detect && s.high === state) return [-1, -1];
        }
        if (!M[s.dest]) continue;
        queue.push(...process(s, M[s.dest]));
    }
    return [low, high];
};

let count = [0, 0];
for (let i = 0; i < 1000; i++) {
    const [low, high] = push();
    count = [count[0] + low, count[1] + high];
}
console.log('A', count[0] * count[1]);

const countPress = (dest: string, state: boolean) => {
    //reset
    Object.keys(M).forEach((name) => {
        M[name].on = false;
        Object.keys(M[name].input).forEach((k) => (M[name].input[k] = false));
    });
    let press = 0;
    while (true) {
        const [low, high] = push(dest, state);
        press++;
        if (low === -1 && high === -1) break;
    }
    return press;
};

//The input seems to be have a pattern of rx - ?? - four conjunctions
//so finding the smaller cycles first and then lcm
const conjs: string[] = [];
for (const i in M) {
    if (M[i].targets.includes('rx')) {
        for (const j in M) {
            if (M[j].targets.includes(i)) conjs.push(j);
        }
    }
}
const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
const lcm = (x: number, y: number) => (x * y) / gcd(x, y);
console.log('B', conjs.map((c) => countPress(c, false)).reduce(lcm));
