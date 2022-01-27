const step = 380;

let arr = [0];
let pos = 0;
for(let i=1; i<=2017; i++) {
    pos = (pos + step) % arr.length + 1;
    arr.splice(pos, 0, i);
}
console.log('Part 1', arr[pos + 1]);

let val;
pos = 0;
for(let i=1; i<=5e7; i++) {
    pos = (pos + step) % i + 1;
    if(pos === 1) val = i;
}
console.log('Part 2', val);
