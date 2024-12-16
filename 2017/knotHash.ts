const reverse = (arr: number[], i: number, n: number) => {
    let _arr = [...arr.slice(i), ...arr.slice(0, i)];
    _arr = [..._arr.slice(0, n).reverse(), ..._arr.slice(n)];
    return [..._arr.slice(-i), ..._arr.slice(0, -i)];
};

function run(
    _arr: number[],
    lengths: number[],
    i: number = 0,
    skip: number = 0
): [number[], number, number] {
    let arr = [..._arr];
    lengths.forEach((n) => {
        arr = reverse(arr, i, n);
        i = (i + n + skip) % arr.length;
        skip += 1;
    });
    return [arr, i, skip];
}

function knotHash(s: string) {
    let lengths = [
        ...s.split('').map((c) => c.charCodeAt(0)),
        17,
        31,
        73,
        47,
        23
    ];
    let arr = [...Array(256)].map((_, i) => i);
    let i = 0;
    let skip = 0;
    for (let x = 0; x < 64; x++) {
        [arr, i, skip] = run(arr, lengths, i, skip);
    }
    return arr
        .reduce((a: number[][], c, ci) => {
            if (ci % 16 === 0) a.push([]);
            a.at(-1)!.push(c);
            return a;
        }, [])
        .map((a) => a.reduce((a, c) => a ^ c, 0))
        .map((n) => n.toString(16).padStart(2, '0'))
        .join('');
}

export default knotHash;
