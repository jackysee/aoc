import { dirname } from 'https://deno.land/std@0.120.0/path/mod.ts';
const data = await Deno.readTextFile(
    new URL(dirname(import.meta.url) + '/day8_input.txt')
);

let originalLen = data.replace(/\n/g, '').length;
let s = data
    .trim()
    .split('\n')
    .map((s) =>
        s.replace(/^"|"$/g, '').replace(/\\"|\\\\|\\x[0-9a-f][0-9a-f]/g, '_')
    )
    .join('');
console.log('Part 1', originalLen - s.length);

s = data
    .trim()
    .split('\n')
    .map((s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"')
    .join('');
console.log('Part 2', s.length - originalLen);
