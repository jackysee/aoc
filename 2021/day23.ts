/*
#############
#...........#
###A#D#A#C###
  #D#C#B#A#
  #D#B#A#C#
  #C#D#B#B#
  #########
*/

const RoomA = ['A', 'D', 'D', 'C'];
const RoomB = ['D', 'C', 'B', 'D'];
const RoomC = ['A', 'B', 'A', 'B'];
const RoomD = ['C', 'A', 'C', 'B'];
const canWait = {
    RoomA: {
        W1: ['W2'],
        W2: [],
        W3: [],
        W4: ['W3'],
        W5: ['W3', 'W4'],
        W6: ['W3', 'W4', 'W5'],
        W7: ['W3', 'W4', 'W5', 'W6']
    },
    RoomB: {
        W1: ['W2', 'W3'],
        W2: ['W3'],
        W3: [],
        W4: [],
        W5: ['W4'],
        W6: ['W4', 'W5'],
        W7: ['W4', 'W5', 'W6']
    },
    RoomC: {
        W1: ['W2', 'W3', 'W4'],
        W2: ['W3', 'W4'],
        W3: ['W4'],
        W4: [],
        W5: [],
        W6: ['W5'],
        W7: ['W5', 'W6']
    },
    RoomD: {
        W1: ['W2', 'W3', 'W4', 'W5'],
        W2: ['W3', 'W4', 'W5'],
        W3: ['W4', 'W5'],
        W4: ['W5'],
        W5: [],
        W6: [],
        W7: ['W6']
    }
};
const canAccessRoom = {
    W1: {
        RoomA: ['W2'],
        RoomB: ['W2', 'W3'],
        RoomC: ['W2', 'W3', 'W4'],
        RoomD: ['W2', 'W3', 'W4', 'W5']
    },
    W2: {
        RoomA: [],
        RoomB: ['W3'],
        RoomC: ['W3', 'W4'],
        RoomD: ['W3', 'W4', 'W5']
    },
    W3: {
        RoomA: [],
        RoomB: [],
        RoomC: ['W4'],
        RoomD: ['W4', 'W5']
    },
    W4: {
        RoomA: ['W3'],
        RoomB: [],
        RoomC: [],
        RoomD: ['W5']
    },
    W5: {
        RoomA: ['W3', 'W4'],
        RoomB: ['W4'],
        RoomC: [],
        RoomD: []
    },
    W6: {
        RoomA: ['W3', 'W4', 'W5'],
        RoomB: ['W4', 'W5'],
        RoomC: ['W5'],
        RoomD: []
    },
    W7: {
        RoomA: ['W6', 'W5', 'W4', 'W3'],
        RoomB: ['W6', 'W5', 'W4'],
        RoomC: ['W6', 'W5'],
        RoomD: ['W6']
    }
};
