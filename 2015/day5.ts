import data from './day5_input.ts';

let arr: string[] = data().trim().split('\n');

const threeVowels = (s: string) => /[aeiou].*[aeiou].*[aeiou]/.test(s);
const repeatChars = (s: string) => /(.)\1/.test(s);
const noDisallowed = (s: string) => !/(ab|cd|pq|xy)/.test(s);
console.log(
    'Part 1',
    arr.filter((s) => threeVowels(s) && repeatChars(s) && noDisallowed(s))
        .length
);

const hasNoOverlappingPairs = (s: string) => /(..).*\1/.test(s);
const hasRepeatBetween = (s: string) => /(.).\1/.test(s);

console.log(
    'Part 2',
    arr.filter((s) => hasNoOverlappingPairs(s) && hasRepeatBetween(s)).length
);
