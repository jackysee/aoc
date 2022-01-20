import { md5 } from 'https://esm.run/hash-wasm@4';
// const salt = 'abc';
const salt = 'ahsbgdzn';

async function run(hashFunc: (s: string) => Promise<string>) {
    const t = Date.now();
    const hashes = [];
    for (let i = 0; i <= 1000; i++) hashes.push(await hashFunc(salt + i));
    let i = 0;
    let key = 0;
    while (true) {
        let s = hashes.shift()!;
        let m = s.match(/(.)(?=\1\1)/);
        if (m) {
            let five = Array.from({ length: 5 }).fill(m[0]).join('');
            if (hashes.some((s) => s.indexOf(five) !== -1)) {
                key++;
                if (key === 64) return [i, Date.now() - t];
            }
        }
        i++;
        hashes.push(await hashFunc(salt + (1000 + i)));
    }
}

const createHash =
    (t: number = 1) =>
    async (s: string) => {
        for (let i = 0; i < t; i++) s = await md5(s);
        return s;
    };

console.log('Part 1', await run(createHash()));
console.log('Part 2', await run(createHash(2017)));
