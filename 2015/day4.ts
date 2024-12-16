import { Md5 } from 'https://deno.land/std/hash/md5.ts';
let data = 'yzbqklnj';

let i = 1;
let part1 = false;
while (true) {
    let s = new Md5().update(data + i).toString();
    if (/^00000/.test(s) && !part1) {
        console.log('Part 1', i);
        part1 = true;
    }
    if (/^000000/.test(s)) {
        console.log('Part 2', i);
        break;
    }
    i++;
}
