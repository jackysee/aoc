const data = '3113322113';

function play(s: string) {
    let r: string = '';
    let current: string = s[0];
    let count = 1;
    let i = 1;
    while (true) {
        let c = s[i];
        if (i === s.length) {
            r += count + current;
            break;
        }
        if (c !== current) {
            r += count + current;
            current = c;
            count = 1;
        } else {
            count++;
        }
        i++;
    }
    return r;
}

let s = data;
for (let i = 0; i < 50; i++) {
    s = play(s);
    if (i === 39) console.log('Part 1', s.length);
}
console.log('Part 2', s.length);
