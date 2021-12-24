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
    {
        RoomA: [1],
        RoomB: [1, 2],
        RoomC: [1, 2, 3],
        RoomD: [1, 2, 3, 4]
    },
    {
        RoomA: [],
        RoomB: [2],
        RoomC: [2, 3],
        RoomD: [2, 3, 4]
    },
    {
        RoomA: [],
        RoomB: [],
        RoomC: [3],
        RoomD: [3, 4]
    },
    {
        RoomA: [2],
        RoomB: [],
        RoomC: [],
        RoomD: [4]
    },
    {
        RoomA: [2, 3],
        RoomB: [3],
        RoomC: [],
        RoomD: []
    },
    {
        RoomA: [2, 3, 4],
        RoomB: [3, 4],
        RoomC: [4],
        RoomD: []
    },
    {
        RoomA: [5, 4, 3, 2],
        RoomB: [5, 4, 3],
        RoomC: [5, 4],
        RoomD: [5]
    }
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

const RoomA = ['A', 'D', 'D', 'C'];
const RoomB = ['D', 'C', 'B', 'D'];
const RoomC = ['A', 'B', 'A', 'B'];
const RoomD = ['C', 'A', 'C', 'B'];

interface State {
    waiting: Array<string | null>;
    energy: number;
    RoomA: string[];
    RoomB: string[];
    RoomC: string[];
    RoomD: string[];
}

let queue: State[] = [
    {
        waiting: Array(7).fill(null),
        energy: 0,
        RoomA: [...RoomA],
        RoomB: [...RoomB],
        RoomC: [...RoomC],
        RoomD: [...RoomD]
    }
];

const deepCopy = (s: State): State => JSON.parse(JSON.stringify(s));

const canEnterRoom = (pod: string, room: string[]) =>
    room.length === 0 || room.every((p) => p === pod);

const completed = (state: State) =>
    ['A', 'B', 'C', 'D'].every((pod) => {
        let room = state[`Room${pod}` as Room];
        return room.every((p) => p === pod) && room.length === 4;
    });

let min = Infinity;
const done: State[] = [];
while (queue.length) {
    // console.log(queue.length);
    let state = queue.pop()!;
    //queue possible next states
    ['A', 'B', 'C', 'D'].forEach((r) => {
        const roomKey = `Room${r}` as Room;
        const room = state[roomKey];
        if (room.length && room.some((p) => p !== r)) {
            canWait[roomKey].forEach((ws, w) => {
                //the waiting area and its path is empty
                if (ws.every((w) => !state.waiting[w]) && !state.waiting[w]) {
                    let _state = deepCopy(state);
                    let pod = _state[roomKey].shift() as Pod;
                    _state.waiting[w] = pod;
                    _state.energy +=
                        (dist[roomKey][`W${w}`] +
                            (4 - _state[roomKey].length)) *
                        rate[pod];
                    queue.push(_state);
                }
            });
        }
    });
    state.waiting.forEach((pod, w) => {
        if (pod) {
            const room = `Room${pod}` as Room;
            const targetRoom = state[room];
            const canEnter =
                canAccessRoom[w][room].every(
                    (w: number) => !state.waiting[w]
                ) && canEnterRoom(pod, targetRoom);
            if (canEnter) {
                let _state = deepCopy(state);
                // console.log('before', state);
                // console.log(
                //     'waiting area',
                //     w,
                //     'with pod',
                //     pod,
                //     'canEnter',
                //     _state[room]
                // );
                _state.waiting[w] = null;
                _state.energy +=
                    (dist[`W${w}`][`Room${pod}`] + (4 - _state[room].length)) *
                    rate[pod as Pod];
                _state[room].push(pod);
                if (completed(_state)) {
                    min = Math.min(min, _state.energy);
                    // console.log('done', _state.energy);
                } else {
                    // console.log('after', _state);
                    queue.push(_state);
                }
            }
        }
    });
    // break;
}
console.log(done);

/*
#############
#...........#
###A#D#A#C###
  #D#C#B#A#
  #D#B#A#C#
  #C#D#B#B#
  #########
*/
