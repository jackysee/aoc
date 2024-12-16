//AOC2018 D9
import data from './day9_input.js';

function getTarget(list, marble, delta) {
    let result = marble;
    [...Array(Math.abs(delta))].forEach(() => {
        result = list[result][delta > 0 ? 'next' : 'prev'];
    });
    return result;
}

function play({ players: _players, last }) {
    let list = [...Array(last)].map((_, i) => ({
        prev: undefined,
        next: undefined
    }));
    list[0] = { prev: 0, next: 0 };
    let currentMarble = 0;
    let players = Array(_players).fill(0);
    let currentPlayer = 0;
    for (let i = 1; i < last; i++) {
        if (i % 23 === 0) {
            let target = getTarget(list, currentMarble, -7);
            players[currentPlayer] += i + target;
            let { prev, next } = list[target];
            list[prev].next = next;
            currentMarble = next;
        } else {
            let target = list[currentMarble].next;
            let { prev, next } = list[target];
            list[i].prev = target;
            list[i].next = next;
            list[target].next = i;
            list[next].prev = i;
            currentMarble = i;
        }
        currentPlayer++;
        if (currentPlayer === players.length) {
            currentPlayer = 0;
        }
    }
    return Math.max(...players.filter(Boolean));
}

// console.log(play({players:9, last:25})); //32
// console.log(play({players:10, last:1618})); //8317
// console.log(play({players:13, last:7999})); //14673
// console.log(play({players:17, last:1140})); //2764
// console.log(play({players:21, last:6111})); //54718
// console.log(play({players:30, last:5807})); //37305

//405 players; last marble is worth 70953 points
let d = { players: 405, last: 70953 };
console.log(play(d)); //422980
console.log(play({ ...d, last: d.last * 100 }));
