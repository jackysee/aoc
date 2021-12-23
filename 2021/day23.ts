// import data from './day23_input.ts';
// import data from './day23_sample.ts';

// console.log(3 + 6 + 50 + 500 + 30 + 7000 + 7000 + 30 + 60 + 700 + 6);

let G = {
    W1: [{ node: 'W2', step: 1 }],
    W2: [
        { node: 'A1', step: 2 },
        { node: 'W3', step: 2 }
    ],
    W3: [
        { node: 'A1', step: 2 },
        { node: 'B1', step: 2 },
        { node: 'W4', step: 2 }
    ],
    W4: [
        { node: 'B1', step: 2 },
        { node: 'C1', step: 2 },
        { node: 'W5', step: 2 }
    ],
    W5: [
        { node: 'C1', step: 2 },
        { node: 'D1', step: 2 },
        { node: 'W6', step: 2 }
    ],
    W6: [{ node: 'W7', step: 1 }],
    A1: [
        { node: 'A2', step: 1 },
        { node: 'W2', step: 2 },
        { node: 'W3', step: 2 }
    ],
    A2: [
        { node: 'A3', step: 1 },
        { node: 'A1', step: 1 }
    ],
    A3: [
        { node: 'A2', step: 1 },
        { node: 'A4', step: 1 }
    ],
    A4: [{ node: 'A3', step: 1 }],

    B1: [
        { node: 'B2', step: 1 },
        { node: 'W3', step: 2 },
        { node: 'W4', step: 2 }
    ],
    B2: [
        { node: 'B3', step: 1 },
        { node: 'B1', step: 1 }
    ],
    B3: [
        { node: 'B2', step: 1 },
        { node: 'B4', step: 1 }
    ],
    B4: [{ node: 'B3', step: 1 }],

    C1: [
        { node: 'C2', step: 1 },
        { node: 'W4', step: 2 },
        { node: 'W5', step: 2 }
    ],
    C2: [
        { node: 'C3', step: 1 },
        { node: 'C1', step: 1 }
    ],
    C3: [
        { node: 'C2', step: 1 },
        { node: 'C4', step: 1 }
    ],
    C4: [{ node: 'C3', step: 1 }],

    D1: [
        { node: 'D2', step: 1 },
        { node: 'W5', step: 2 },
        { node: 'W6', step: 2 }
    ],
    D2: [
        { node: 'D3', step: 1 },
        { node: 'D1', step: 1 }
    ],
    D3: [
        { node: 'D2', step: 1 },
        { node: 'D4', step: 1 }
    ],
    D4: [{ node: 'D3', step: 1 }]
};

// console.log(G);

/* input
 *
 *
 *
 
#############
#...........#
###A#D#A#C###
  #D#C#B#A#
  #D#B#A#C#
  #C#D#B#B#
  #########

* */

interface Amphipod {
    name: string;
    at: string;
    p1?: string;
    p2?: string;
}

let amphipods: Amphipod[] = [
    { name: 'A1', at: 'A1', p1: undefined, p2: undefined },
    { name: 'D1', at: 'A2', p1: undefined, p2: undefined },
    { name: 'D2', at: 'A3', p1: undefined, p2: undefined },
    { name: 'C1', at: 'A4', p1: undefined, p2: undefined },

    { name: 'D3', at: 'B1', p1: undefined, p2: undefined },
    { name: 'C2', at: 'B2', p1: undefined, p2: undefined },
    { name: 'B1', at: 'B3', p1: undefined, p2: undefined },
    { name: 'D4', at: 'B4', p1: undefined, p2: undefined },

    { name: 'A2', at: 'C1', p1: undefined, p2: undefined },
    { name: 'B2', at: 'C2', p1: undefined, p2: undefined },
    { name: 'A3', at: 'C3', p1: undefined, p2: undefined },
    { name: 'B3', at: 'C4', p1: undefined, p2: undefined },

    { name: 'C3', at: 'D1', p1: undefined, p2: undefined },
    { name: 'A4', at: 'D2', p1: undefined, p2: undefined },
    { name: 'C4', at: 'D3', p1: undefined, p2: undefined },
    { name: 'B4', at: 'D4', p1: undefined, p2: undefined }
];

const reachable = (am: Amphipod, list: Amphipod[]) => {
    return G[am.at as keyof typeof G].filter((n) =>
        list.every((am) => n.node !== am.at)
    );
};

console.log('af---------');
console.log(reachable(amphipods[0], amphipods));
const s = `

#############
#...........#
###A#D#A#C###
  #D#C#B#A#
  #D#B#A#C#
  #C#D#B#B#
  #########

#############
#...........#
###A#b#C#D###
  #A#B#C#D#
  #A#B#C#D#
  #A#B#C#D#
  #########
`;

console.log(
    '3 6 8 9 9'
        .split(' ')
        .map(Number)
        .reduce((a, c) => a + c, 0) *
        1 +
        '8 9 9 8 5 6 6 6'
            .split(' ')
            .map(Number)
            .reduce((a, c) => a + c, 0) *
            10 +
        '9 5 6 7 5'
            .split(' ')
            .map(Number)
            .reduce((a, c) => a + c, 0) *
            100 +
        '10 10 5 5 7 9'
            .split(' ')
            .map(Number)
            .reduce((a, c) => a + c, 0) *
            1000
);
