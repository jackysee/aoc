export default {};

import data from './day1_input.ts';

let arr: Array<number> = data()
    .trim()
    .split('\n')
    .map((s: string) => parseInt(s, 10));
