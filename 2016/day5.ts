import { md5 } from 'https://esm.run/hash-wasm@4';
const input = 'reyedfim';
let result = [];
let i = 0;
while (true) {
    let valid = result.filter((c) => /[0-7]/.test(c[0]));
    if (new Set(valid.map((a) => a[0])).size === 8) {
        console.log(
            'Part 1',
            result
                .map((a) => a[0])
                .slice(0, 8)
                .join('')
        );
        console.log(
            'Part 2',
            Object.values(
                valid
                    .sort((a, b) => Number(a[0]) - Number(b[0]))
                    .reduce((a, c) => {
                        if (a[c[0]] === undefined) a[c[0]] = c[1];
                        return a;
                    }, {} as Record<string, string>)
            ).join('')
        );
        break;
    }
    let s = await md5(input + i);
    // let s = new Md5().update(input + i).toString();
    if (/^00000/.test(s)) {
        result.push([s[5], s[6]]);
        console.log('added', s[5], s[6]);
    }
    i++;
}
