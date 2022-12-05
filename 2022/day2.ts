import data from './day2_input.ts';
// import data from './day2_sample.ts';

const arr: string[] = data().split('\n');

//X === rock, Y === paper, Z === scissors
//A === rock, B === paper, C === scissors
const scores1: Record<string, number> = {
    'A X': 1 + 3,
    'A Y': 2 + 6,
    'A Z': 3 + 0,
    'B X': 1 + 0,
    'B Y': 2 + 3,
    'B Z': 3 + 6,
    'C X': 1 + 6,
    'C Y': 2 + 0,
    'C Z': 3 + 3
};

console.log(
    'A',
    arr.reduce((a, c) => a + scores1[c], 0)
);

//X === lose, Y === draw,  Z === win
//A === rock, B === paper, C === scissors
const scores2: Record<string, number> = {
    'A X': 3 + 0,
    'A Y': 1 + 3,
    'A Z': 2 + 6,
    'B X': 1 + 0,
    'B Y': 2 + 3,
    'B Z': 3 + 6,
    'C X': 2 + 0,
    'C Y': 3 + 3,
    'C Z': 1 + 6
};

console.log(
    'B',
    arr.reduce((a, c) => a + scores2[c], 0)
);
