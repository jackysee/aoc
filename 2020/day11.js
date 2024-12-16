//AOC2020 D11
import data from './day11_input.js';

const arrToMap = (arr) => {
    var str = '';
    var width = arr[0].length;
    var height = arr.length;
    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            str += arr[j][i];
        }
        if (j < height - 1) str += '\n';
    }
    return str;
};

const parseMap = (str) => {
    var arr = str.split('\n').map((l) => l.split(''));
    var width = arr[0].length;
    var height = arr.length;
    var at = (x, y) => {
        if (x < 0 || y < 0 || x >= width || y >= height) return undefined;
        return arr[y][x];
    };
    return {
        width,
        height,
        at,
        toString: () => arrToMap(arr)
    };
};

function getAdjacents(x, y, map) {
    return [
        map.at(x - 1, y - 1),
        map.at(x, y - 1),
        map.at(x + 1, y - 1),
        map.at(x - 1, y),
        map.at(x + 1, y),
        map.at(x - 1, y + 1),
        map.at(x, y + 1),
        map.at(x + 1, y + 1)
    ].filter((p) => p !== undefined);
}

const seated = (c) => c === '#';
const createSeat = (getAdjacents, tolerance) => (str) => {
    const map = parseMap(str);
    const result = [];
    for (let j = 0; j < map.height; j++) {
        result.push([]);
        for (let i = 0; i < map.width; i++) {
            const seat = map.at(i, j);
            const adjs = getAdjacents(i, j, map);
            let _seat = seat;
            if (seat === 'L' && !adjs.some(seated)) {
                _seat = '#';
            } else if (
                seat === '#' &&
                adjs.filter(seated).length >= tolerance
            ) {
                _seat = 'L';
            }
            result[j].push(_seat);
        }
    }
    return arrToMap(result);
};

function seatUntilNoChange(str, seat) {
    let _str;
    while (_str !== str) {
        _str = str;
        str = seat(str);
    }
    return str;
}

console.log(
    seatUntilNoChange(data(), createSeat(getAdjacents, 4))
        .split('')
        .filter(seated).length
);

function getSeatAlong([x0, y0], [dx, dy], map) {
    let x = x0 + dx,
        y = y0 + dy,
        result = [];
    while (x >= 0 && x < map.width && y >= 0 && y < map.height) {
        result.push([x, y]);
        x += dx;
        y += dy;
    }
    return result.map((p) => map.at(...p)).find((c) => c === '#' || c === 'L');
}

function getAdjacents2(x, y, map) {
    let result = [
        getSeatAlong([x, y], [0, -1], map),
        getSeatAlong([x, y], [1, -1], map),
        getSeatAlong([x, y], [1, 0], map),
        getSeatAlong([x, y], [1, 1], map),
        getSeatAlong([x, y], [0, 1], map),
        getSeatAlong([x, y], [-1, 1], map),
        getSeatAlong([x, y], [-1, 0], map),
        getSeatAlong([x, y], [-1, -1], map)
    ];
    return result.filter((p) => p !== undefined);
}

console.log(
    seatUntilNoChange(data(), createSeat(getAdjacents2, 5))
        .split('')
        .filter(seated).length
);

function sample() {
    return `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;
}
