import data from './day25_input.ts';
let lines = data().split('\n');
let state = lines[0].match(/(?<=state )[A-Z]/)![0];
let steps = lines[1].match(/\d+/)!.map(Number)[0];
let states: Record<string, Function> = {};
lines
    .slice(3)
    .join('\n')
    .split(/\n\n/)
    .forEach((r) => {
        let state = r.match(/(?<=state )[A-Z]/)![0];
        let branches = r
            .split('If')
            .slice(1)
            .map((r) => {
                let value = r.match(/(?<=is )\d+/)![0];
                let write = r.match(/(?<=value )\d+/)![0];
                let slot = r.match(/(?<=to the )\w+/)![0];
                let state = r.match(/(?<=with state )\w+/)![0];
                return [value, write, slot, state];
            });
        states[state] = (list: number[], cursor: number) => {
            for (let [value, write, slot, state] of branches) {
                if (list[cursor] === +value) {
                    list[cursor] = +write;
                    let c = cursor + (slot === 'right' ? 1 : -1);
                    if (c === list.length) list.push(0);
                    if (c === -1) {
                        list.unshift(0);
                        c = 0;
                    }
                    return [c, list, state];
                }
            }
            return [cursor, list, ''];
        };
    });

let cursor = 0;
let list = [0];
for (let i = 0; i < steps; i++) {
    [cursor, list, state] = states[state](list, cursor);
}
console.log('Part 1', list.filter((i) => i === 1).length);
