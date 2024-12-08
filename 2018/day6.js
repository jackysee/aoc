//AOC2018 D6

function parse(s) {
    let pts = s.split('\n').map(l => l.split(', ').map(Number));
    let xs = pts.map(p => p[0]);
    let ys = pts.map(p => p[1]);
    let x1 = Math.min(...xs);
    let x2 = Math.max(...xs);
    let y1 = Math.min(...ys);
    let y2 = Math.max(...ys);
    return { pts, x1, x2, y1, y2 };
}

function solve(s) {
    let { pts, x1, x2, y1, y2 } = parse(s);
    let area = Array(pts.length).fill(0);
    let edges = new Set();
    let region = 0;
    for(let y=y1; y<=y2; y++) {
        for(let x=x1; x<=x2; x++) {
            let dist = pts.map((p, i) => {
                return Math.abs(p[0] - x) + Math.abs(p[1] - y);
            });
            let sum = dist.reduce((a, c) => a + c, 0);
            if(sum < 10000) {
                region++;
            }
            let minDist = Math.min(...dist);
            if(dist.filter(d => d === minDist).length > 1) {
                continue;
            }
            let idx = dist.findIndex(d => d === minDist);
            area[idx] += 1;
            if(x == x1 || x === x2 || y === y1 || y === y2) {
                edges.add(idx);
            }
        }
    }

    let m = 0, idx;
    Object.entries(area)
        .filter(e => !edges.has(e[0]))
        .forEach(([i, v]) => {
            if(v > m) {
                m = v;
                idx = i;
            }
        });
    console.log('part 1:', m);
    console.log('part 2:', region);
}

// console.log(part1(sample()));
solve(data());

function sample() {
    return `
1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
    `.trim();

}

function data() {
    return `
181, 47
337, 53
331, 40
137, 57
200, 96
351, 180
157, 332
113, 101
285, 55
189, 188
174, 254
339, 81
143, 61
131, 155
239, 334
357, 291
290, 89
164, 149
248, 73
311, 190
54, 217
285, 268
354, 113
318, 191
182, 230
156, 252
114, 232
159, 299
324, 280
152, 155
295, 293
194, 214
252, 345
233, 172
272, 311
230, 82
62, 160
275, 96
335, 215
185, 347
134, 272
58, 113
112, 155
220, 83
153, 244
279, 149
302, 167
185, 158
72, 91
264, 67
    `.trim();
}
