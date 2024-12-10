import data from './day1_input.ts';

let arr: string[] = data().split('');

let floor = 0;
let firstBasement:number|undefined;
arr.forEach((c, i) => {
    floor += (c === '(' ? 1 : -1);
    if(floor === -1 && firstBasement === undefined) 
        firstBasement = i + 1;
});

console.log('Part 1', floor);
console.log('Part 2', firstBasement);
