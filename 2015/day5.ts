import data from './day5_input.ts';

let arr: string[] = data().trim().split('\n');

const atLeastThreeVowels = (s: string) =>
    s.split('').filter((c) => 'aeiou'.indexOf(c) !== -1).length >= 3;

const hasRepeatChars = (s: string) => /(.)\1/.test(s);

const noDisallowed = (s: string) =>
    ['ab', 'cd', 'pq', 'xy'].every((_s) => s.indexOf(_s) === -1);

console.log(
    'Part 1',
    arr.filter(
        (s) => atLeastThreeVowels(s) && hasRepeatChars(s) && noDisallowed(s)
    ).length
);

const hasNoOverlappingPairs = (s: string) =>
    s.split('').some((c, ci) => {
        if (!s[ci + 1]) return false;
        return s.slice(ci + 2).indexOf(c + s[ci + 1]) !== -1;
    });

const hasRepeatBetween = (s: string) => /(.)(.)\1/.test(s);

console.log(
    'Part 2',
    arr.filter((s) => hasNoOverlappingPairs(s) && hasRepeatBetween(s)).length
);
