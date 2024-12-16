//AOC2019 D1
import data from './day13_input.js';
/*
 *three output instructions specify the 
 x position (distance from the left), 
 y position (distance from the top), 
 and tile id. The tile id is interpreted as follows:
    0 is an empty tile. No game object appears in this tile.
    1 is a wall tile. Walls are indestructible barriers.
    2 is a block tile. Blocks can be broken by the ball.
    3 is a horizontal paddle tile. The paddle is indestructible.
    4 is a ball tile. The ball moves diagonally and bounces off objects.
    * */

function getGame(str, outputCount, debug) {
    const prg = createProgram(str, outputCount, debug);
    const canvas = {};
    let mx, my, result, score, paddle, ball;
    const draw = () => {
        let arr = [];
        for (let j = 0; j <= my; j++) {
            arr[j] = '';
            for (let i = 0; i <= mx; i++) {
                arr[j] += {
                    0: ' ',
                    1: '+',
                    2: '#',
                    3: '=',
                    4: 'O'
                }[canvas[[i, j]]];
            }
        }
        return arr.join('\n');
    };
    (mx = 0), (my = 0);
    const run = (input = []) => {
        result = prg.run(input) || [];
        for (let i = 0; i < result.length; i += 3) {
            let [x, y, id] = result.slice(i, i + 3);
            if (x == -1 && y == 0 && id > 4) {
                //its score
                score = id;
            } else {
                canvas[[x, y]] = id;
            }
            if (id === 3) {
                paddle = [x, y];
            }
            if (id === 4) {
                ball = [x, y];
            }
            if (x > mx) mx = x;
            if (y > my) my = y;
        }
    };
    return {
        mx,
        my,
        draw,
        run,
        get paddle() {
            return paddle;
        },
        get ball() {
            return ball;
        },
        get score() {
            return score;
        },
        canvas,
        at: (x, y) => canvas[[x, y]],
        halted: () => prg.halted()
    };
}

const game1 = getGame(data());
game1.run();
// console.log(game1.draw());
console.log(Object.entries(game1.canvas).filter(([p, v]) => v === 2).length);

const game2 = getGame(data().replace(/^\d+/, '2'), 3);
while (!game2.halted()) {
    let joystick = 0;
    let { paddle, ball } = game2;
    if (paddle && ball) {
        joystick = paddle[0] === ball[0] ? 0 : paddle[0] > ball[0] ? -1 : 1;
    }
    game2.run([joystick]);
    if (game2.paddle) {
        //process.stdout.write('\x1b[H\x1b[2J' + game2.draw());
        // console.log(game2.draw());
    }
    // console.log('paddle', paddle, 'ball', ball, joystick);
}
console.log(game2.score);

function toIntList(str, sep = ',') {
    return (str + '').split(sep).map((s) => parseInt(s, 10));
}

function createProgram(str, outputCount = -1, debug = false) {
    const list = toIntList(str);
    let pos = 0;
    let output = [];
    let halted = false;
    let firstRun = true;
    let base = 0;

    const getParam = (pos, mode) => {
        if (mode === 1) {
            return pos;
        }
        let v = list[pos + (mode === 2 ? base : 0)];
        return v === undefined ? 0 : v;
    };

    const run = (input) => {
        halted = false;
        output = [];
        while (!halted) {
            if (halted) {
                return output;
            }
            let [ins, p1, p2, p3] = list.slice(pos, pos + 4);
            let op = ins % 100;
            let m1 = Math.floor((ins / 100) % 10);
            let m2 = Math.floor((ins / 1000) % 10);
            let m3 = Math.floor((ins / 10000) % 10);
            let v1 = getParam(p1, m1);
            let v2 = getParam(p2, m2);
            if (m1 === 2) p1 += base;
            if (m2 === 2) p2 += base;
            if (m3 === 2) p3 += base;
            // console.log(' >>>> ' , { pos, op, p1, p2, p3, v1, v2, input, output });
            if (op === 1) {
                if (debug)
                    console.log(
                        `1:(${m1}|${p1},${m2}|${p2},${p3}) add, write address ${p3} (${list[p3]}) with ${v1} + ${v2} = ${v1 + v2}`
                    );
                list[p3] = v1 + v2;
                pos += 4;
            }
            if (op === 2) {
                if (debug)
                    console.log(
                        `2: multiply, write address ${p3} (${list[p3]}) with ${v1} * ${v2} = ${v1 * v2}`
                    );
                list[p3] = v1 * v2;
                pos += 4;
            }
            if (op === 3) {
                if (debug) console.log(`3: read input ${input[0]}`);
                list[p1] = input.shift();
                pos += 2;
            }
            if (op === 4) {
                if (debug) console.log(`4: output ${v1}`);
                output = [...output, v1];
                pos += 2;
                // if(haltOnOutput) {
                //     let _output = [...output];
                //     output = [];
                //     return _output;
                // }
                if (output.length === outputCount) {
                    let _output = [...output];
                    output = [];
                    return _output;
                }
            }
            if (op === 5) {
                if (debug)
                    console.log(
                        `5: jump pos ${pos} to ${v1 !== 0 ? v2 : pos + 3}`
                    );
                pos = v1 != 0 ? v2 : pos + 3;
            }
            if (op === 6) {
                if (debug)
                    console.log(
                        `6: jump pos ${pos} to ${v1 === 0 ? v2 : pos + 3}`
                    );
                pos = v1 == 0 ? v2 : pos + 3;
            }
            if (op === 7) {
                if (debug)
                    console.log(
                        `7: less than: write address ${p3} (${list[p3]}) with ${v1 < v2 ? 1 : 0}`
                    );
                list[p3] = v1 < v2 ? 1 : 0;
                pos += 4;
            }
            if (op === 8) {
                if (debug)
                    console.log(
                        `8: equal, write address ${p3} (${list[p3]}) with ${v1 === v2 ? 1 : 0}`
                    );
                list[p3] = v1 == v2 ? 1 : 0;
                pos += 4;
            }
            if (op === 9) {
                if (debug) console.log(`9: adjust base ${base} +${v1}`);
                base += v1;
                pos += 2;
            }
            if (op === 99) {
                if (debug) console.log(`99: halt, output ${output[0]}`);
                halted = true;
                // pos += 1;
                return output;
            }
        }
    };
    return {
        run,
        halted: () => halted,
        output: () => output
    };
}
