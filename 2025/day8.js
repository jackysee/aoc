import data from './day8_input.js';
// import data from './day8_sample.js';
const points = data().split('\n');

const dist = ([p1, p2]) => {
    const [x1, y1, z1] = p1.split(',').map((n) => +n);
    const [x2, y2, z2] = p2.split(',').map((n) => +n);
    return (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2;
};

const pairs = points
    .flatMap((a, i) => points.slice(i + 1).map((b) => [dist([a, b]), a, b]))
    .toSorted((a, b) => a[0] - b[0])
    .map((i) => i.slice(1));

let arr = [];
let i = 0;
for (const [a, b] of pairs) {
    const sa = arr.find((s) => s.has(a));
    const sb = arr.find((s) => s.has(b));
    i++;
    if (!!sa && !!sb) {
        if (sa === sb) continue;
        arr = arr.filter((s) => s !== sa && s !== sb);
        arr.push(new Set([...sa, ...sb]));
    } else if (!sa && !sb) arr.push(new Set([a, b]));
    else if (sa && !sb) sa.add(b);
    else if (!sa && sb) sb.add(a);
    arr.sort((a, b) => b.size - a.size);
    // if (i === 10) {
    if (i === 1000) {
        console.log(arr.slice(0, 3).reduce((a, c) => a * c.size, 1));
    }
    if (arr?.[0]?.size === points.length) {
        console.log(+a.split(',')[0] * +b.split(',')[0]);
        break;
    }
}
