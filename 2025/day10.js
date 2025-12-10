import { init } from 'npm:dtk-z3-solver-deno-v2@0.1.4';

import data from './day10_input.js';
// import data from './day10_sample.js';
const lights = data()
    .split('\n')
    .map((line) => {
        return {
            target: line.match(/\[(.*)\]/)[1],
            buttons: [...line.matchAll(/\([\d,]+\)/g)].map((m) =>
                m[0]
                    .slice(1, -1)
                    .split(',')
                    .map((n) => +n)
            ),
            joltage: line
                .match(/\{[\d,]+\}/)[0]
                .slice(1, -1)
                .split(',')
                .map((n) => +n)
        };
    });

const buttonPress = ({ target, buttons }) => {
    const initialLight = [...Array(target.length)].map(() => '.').join('');
    const queue = buttons.map((b) => [b, 0, initialLight]);
    // let min = Infinity;
    const seen = new Set();
    while (queue.length) {
        let [button, pressed, lights] = queue.shift();
        if (lights === target) return pressed;
        const newLight = [...lights]
            .map((c, i) => (button.includes(i) ? (c === '#' ? '.' : '#') : c))
            .join('');
        if (seen.has(newLight)) continue;
        pressed++;
        seen.add(newLight);
        queue.push(
            ...buttons
                .filter((b) => b.join(',') !== button.join(','))
                .map((b) => [b, pressed, newLight])
        );
    }
};

console.log(lights.map(buttonPress).reduce((a, c) => a + c, 0));

const result = [];
const letters = 'abcdefghijklmnopqrstuvwxyz';
const { Context } = await init();
for (const { buttons, joltage } of lights) {
    const { Int, Optimize } = new Context('main');
    const solver = new Optimize();
    const vars = buttons.map((_b, i) => Int.const(letters[i]));
    vars.forEach((v) => solver.add(v.ge(0)));
    joltage.forEach((v, i) => {
        let condition = Int.val(0);
        buttons.forEach((b, bi) => {
            if (b.includes(i)) {
                condition = condition.add(vars[bi]);
            }
        });
        solver.add(condition.eq(Int.val(v)));
    });
    const sum = vars.reduce((a, c) => a.add(c), Int.val(0));
    solver.minimize(sum);
    const ans = await solver.check();
    if (ans === 'sat') {
        result.push(+solver.model().eval(sum).toString());
    }
}
console.log(result.reduce((a, c) => a + c, 0));
