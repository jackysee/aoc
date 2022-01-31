import data from './day21_input.ts';
// import data from './day21_sample.ts';

let rules: Record<string, string> = {};
data()
    .split('\n')
    .forEach((l) => {
        let [k, v] = l.split(/\s*\=>\s*/);
        rules[k] = v;
    });

const flip = (s: string) => {
    return s
        .split('/')
        .map((l) => l.split('').reverse().join(''))
        .join('/');
};

const rotate = (s: string) => {
    let g = s.split('/').map((l) => l.split('').reverse());
    return g[0]
        .map((col, i) => {
            return g.map((row) => row[i]).join('');
        })
        .join('/');
};

const getVariants = (s: string) => {
    let _s = flip(s);
    let result = [s, _s];
    for (let i = 0; i < 3; i++) {
        s = rotate(s);
        _s = rotate(_s);
        result.push(s, _s);
    }
    return result;
};

const splitArr = (arr: string[], size: number) => {
    let result = [];
    while (arr.length) {
        result.push(arr.slice(0, size));
        arr = arr.slice(size);
    }
    return result;
};

const split = (s: string): string[] => {
    let lines = s.split('/');
    let size = lines[0].length;
    let divider = size % 2 === 0 ? 2 : 3;
    return splitArr(lines, divider).flatMap((lines) => {
        return lines
            .map((l) => splitArr(l.split(''), divider))
            .reduce((a, c) => {
                c.forEach((s, si) => {
                    a[si] = a[si] || [];
                    a[si].push(s.join(''));
                });
                return a;
            }, [])
            .map((a) => a.join('/'));
    });
};

const join = (s: string[]) => {
    let size = Math.sqrt(s.length);
    return splitArr(s, size)
        .flatMap((s) => {
            return s
                .map((s) => s.split('/'))
                .reduce((a, c) => {
                    c.forEach((l, li) => {
                        a[li] = (a[li] || '') + l;
                    });
                    return a;
                }, []);
        })
        .join('/');
};

let pattern = '.#./..#/###';
for (let i = 0; i < 18; i++) {
    pattern = join(
        split(pattern).map((p) => {
            for (let _p of getVariants(p)) {
                if (rules[_p]) {
                    return rules[_p];
                }
            }
            return '';
        })
    );
    if (i === 4) {
        console.log(
            'Part 1',
            pattern.split('').filter((c) => c === '#').length
        );
    }
}
console.log('Part 2', pattern.split('').filter((c) => c === '#').length);
