import { BinaryHeap } from 'https://deno.land/x/collections@0.11.2/mod.ts';

/*
#############
#...........#
###A#D#A#C###
  #D#C#B#A#
  #D#B#A#C#
  #C#D#B#B#
  #########
notation:

W0 | W1 | EA | W2 | EB | W3 | EC | W4 | ED | W5 | W6
          RA        RB        RC        RD
*/

//can go to waiting area of index when array of waiting area is empty
//e.g. RoomA[0] = [1] mean from RoomA, can go to W0 when W1 is empty
const canWait = {
    RoomA: [[1], [], [], [2], [2, 3], [2, 3, 4], [2, 3, 4, 5]],
    RoomB: [[1, 2], [2], [], [], [3], [3, 4], [3, 4, 5]],
    RoomC: [[1, 2, 3], [2, 3], [3], [], [], [4], [4, 5]],
    RoomD: [[1, 2, 3, 4], [2, 3, 4], [3, 4], [4], [], [], [5]]
};
type Room = keyof typeof canWait;

//from waiting area of index, can go to rooom when array of waiting area is empty
//e.g. canAccessRoom[0].RoomA = [1] mean at W0 to enter RoomA, W1 needs to be empty
const canAccessRoom = [
    { RoomA: [1], RoomB: [1, 2], RoomC: [1, 2, 3], RoomD: [1, 2, 3, 4] },
    { RoomA: [], RoomB: [2], RoomC: [2, 3], RoomD: [2, 3, 4] },
    { RoomA: [], RoomB: [], RoomC: [3], RoomD: [3, 4] },
    { RoomA: [2], RoomB: [], RoomC: [], RoomD: [4] },
    { RoomA: [2, 3], RoomB: [3], RoomC: [], RoomD: [] },
    { RoomA: [2, 3, 4], RoomB: [3, 4], RoomC: [4], RoomD: [] },
    { RoomA: [5, 4, 3, 2], RoomB: [5, 4, 3], RoomC: [5, 4], RoomD: [5] }
];

const dist: { [key: string]: any } = {
    RoomA: { W0: 2, W1: 1, W2: 1, W3: 3, W4: 5, W5: 7, W6: 8 },
    RoomB: { W0: 4, W1: 3, W2: 1, W3: 1, W4: 3, W5: 5, W6: 6 },
    RoomC: { W0: 6, W1: 5, W2: 3, W3: 1, W4: 1, W5: 3, W6: 4 },
    RoomD: { W0: 8, W1: 7, W2: 5, W3: 3, W4: 1, W5: 1, W6: 2 },
    W0: { RoomA: 2, RoomB: 4, RoomC: 6, RoomD: 8 },
    W1: { RoomA: 1, RoomB: 3, RoomC: 5, RoomD: 7 },
    W2: { RoomA: 1, RoomB: 1, RoomC: 3, RoomD: 5 },
    W3: { RoomA: 3, RoomB: 1, RoomC: 1, RoomD: 3 },
    W4: { RoomA: 5, RoomB: 3, RoomC: 1, RoomD: 1 },
    W5: { RoomA: 7, RoomB: 5, RoomC: 3, RoomD: 1 },
    W6: { RoomA: 8, RoomB: 6, RoomC: 4, RoomD: 2 }
};

let rate = { A: 1, B: 10, C: 100, D: 1000 };
type Pod = keyof typeof rate;

interface State {
    waiting: Array<string | null>;
    energy: number;
    RoomA: string[];
    RoomB: string[];
    RoomC: string[];
    RoomD: string[];
}

const deepCopy = (s: State): State => ({
    waiting: [...s.waiting],
    energy: s.energy,
    RoomA: [...s.RoomA],
    RoomB: [...s.RoomB],
    RoomC: [...s.RoomC],
    RoomD: [...s.RoomD]
});

const canEnterRoom = (pod: string, room: string[]) =>
    room.length === 0 || room.every((p) => p === pod);

const hash = (s: State) =>
    [
        s.waiting.map((s) => s || '.').join(''),
        s.RoomA.join(''),
        s.RoomB.join(''),
        s.RoomC.join(''),
        s.RoomD.join('')
    ].join('|');

function solve(state: State) {
    let queue = new BinaryHeap<State>(
        (a: State, b: State) => a.energy - b.energy
    );
    queue.push(state);
    let visited = new Map<string, number>();
    visited.set(hash(state), Infinity);
    let roomSize = state.RoomA.length;
    const completed = (state: State) =>
        ['A', 'B', 'C', 'D'].every((pod) => {
            let room = state[`Room${pod}` as Room];
            return room.every((p) => p === pod) && room.length === roomSize;
        });
    let t = performance.now();
    while (queue.length) {
        let state = queue.pop()!;

        if (completed(state)) {
            return [state.energy, performance.now() - t];
        }

        //queue possible next states
        ['A', 'B', 'C', 'D'].forEach((r) => {
            const roomKey = `Room${r}` as Room;
            const room = state[roomKey];
            if (room.length && room.some((p) => p !== r)) {
                canWait[roomKey].forEach((ws, w) => {
                    //the waiting area and its path is empty
                    if ([...ws, w].every((w) => !state.waiting[w])) {
                        let _state = deepCopy(state);
                        let pod = _state[roomKey].shift() as Pod;
                        _state.waiting[w] = pod;
                        _state.energy +=
                            (dist[roomKey][`W${w}`] +
                                (roomSize - _state[roomKey].length)) *
                            rate[pod];
                        if (
                            !visited.has(hash(_state)) ||
                            _state.energy < visited.get(hash(_state))!
                        ) {
                            visited.set(hash(_state), _state.energy);
                            queue.push(_state);
                        }
                    }
                });
            }
        });
        state.waiting.forEach((pod, w) => {
            if (!pod) return;
            const room = `Room${pod}` as Room;
            const targetRoom = state[room];
            const canEnter =
                canAccessRoom[w][room].every((w) => !state.waiting[w]) &&
                canEnterRoom(pod, targetRoom);
            if (canEnter) {
                let _state = deepCopy(state);
                _state.waiting[w] = null;
                _state.energy +=
                    (dist[`W${w}`][`Room${pod}`] +
                        (roomSize - _state[room].length)) *
                    rate[pod as Pod];
                _state[room].push(pod);
                if (
                    !visited.has(hash(_state)) ||
                    _state.energy < visited.get(hash(_state))!
                ) {
                    visited.set(hash(_state), _state.energy);
                    queue.push(_state);
                }
            }
        });
    }
    return 'none';
}

const part1State = {
    waiting: Array(7).fill(null),
    energy: 0,
    RoomA: ['A', 'C'],
    RoomB: ['D', 'D'],
    RoomC: ['A', 'B'],
    RoomD: ['C', 'B']
};
const result1 = solve(part1State);
console.log('Part 1', result1[0], `took ${result1[1]} ms`);

const part2State = {
    waiting: Array(7).fill(null),
    energy: 0,
    RoomA: ['A', 'D', 'D', 'C'],
    RoomB: ['D', 'C', 'B', 'D'],
    RoomC: ['A', 'B', 'A', 'B'],
    RoomD: ['C', 'A', 'C', 'B']
};
const result2 = solve(part2State);
console.log('Part 2', result2[0], `took ${result2[1]} ms`);
