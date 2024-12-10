import data from './day16_input.ts';
const steps = data()
    .split(',')
    .map((l) => {
        let [x, y] = (l.match(/\d+/g) || []).map(Number);
        if (/^s/.test(l)) {
            return (s: string[]) => [...s.slice(-x), ...s.slice(0, -x)];
        }
        if (/^x/.test(l)) {
            return (s: string[]) => {
                [s[x], s[y]] = [s[y], s[x]];
                return s;
            };
        }
        if (/^p/.test(l)) {
            let [a, b] = l.slice(1).split('/');
            return (s: string[]) => {
                let [x, y] = [a, b].map((c) => s.indexOf(c));
                [s[x], s[y]] = [s[y], s[x]];
                return s;
            };
        }
        return (s: string[]) => s;
    });

function run(pg: string, times: number) {
    let seen:string[] = [pg];
    let pgs = pg.split('');
    for (let i = 0; i < times; i++) {
        pgs = steps.reduce((a, c) => c(a), pgs);
        if (seen.includes(pgs.join(''))) {
            return [...seen][times % (i + 1) ];
        }
        seen.push(pgs.join(''));
    }
    return pgs.join('');
}
console.log('Part 1', run('abcdefghijklmnop', 1));
console.log('Part 2', run('abcdefghijklmnop', 1_000_000_000));
