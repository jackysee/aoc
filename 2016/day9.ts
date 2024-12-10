import data from './day9_input.ts';
function decompress(input:string, expand = false):number {
    let m = input.match(/\((\d+)x(\d+)\)/);
    if(!m) return input.length;
    let start = m.index! + m[0].length;
    let end = start + Number(m[1]);
    let len = expand? decompress(input.slice(start, end), expand) : Number(m[1]);
    return m.index! + Number(m[2]) * len + decompress(input.slice(end), expand);
}
console.log('Part 1', decompress(data()));
console.log('Part 2', decompress(data(), true));

