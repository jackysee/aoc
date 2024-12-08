//AOC2020 D22

function parse(str) {
    let [p1, p2] = str.split('\n\n');
    return [
        p1.split('\n').slice(1).map(s => parseInt(s, 10)),
        p2.split('\n').slice(1).map(s => parseInt(s, 10))
    ]
}

function game(p1, p2, recursive = false) {
    // console.log('game', {p1,p2});
    let p1Rounds = [];
    let p2Rounds = [];
    while(true) {
        if(p1.length === 0 || p2.length === 0) {
            break;
        }
        if(recursive) {
            if(p1Rounds.includes(p1.join(',')) || p2Rounds.includes(p2.join(','))) {
                return {winner:'p1', arr:p1};
            }
        }
        p1Rounds.push(p1.join(','));
        p2Rounds.push(p2.join(','));
        let c1 = p1.shift();
        let c2 = p2.shift();
        let p1Win = false, p2Win = false;
        if(recursive && p1.length >= c1 && p2.length >= c2) {
            let result = game(p1.slice(0, c1), p2.slice(0, c2), true);
            p1Win = result.winner === 'p1';
            p2Win = result.winner === 'p2';
            // console.log('inner game', result.winner);
        } else {
            if(c1 > c2) p1Win = true;
            if(c2 > c1) p2Win = true;
        }
        if(p1Win) {
            p1 = [...p1, c1, c2 ];
        }
        if(p2Win) {
            p2 = [...p2, c2, c1 ];
        }
        // console.log('round', {p1,p2});
    }
    return { winner: p1.length? 'p1':'p2', arr: p1.length? p1 : p2 };
}

function part1(str, recursive = false) {
    let [p1, p2] = parse(str);
    let arr = game(p1, p2, recursive).arr;
    let len = arr.length;
    return arr.reduce((a, c, i) => a + c * (len - i), 0)
}

console.log(part1(data()));
// console.log(part1(sample(), true)); //291
console.log(part1(data(), true)); //291


function sample() {
    return `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;
}

function data() {
    return `Player 1:
19
22
43
38
23
21
2
40
31
17
27
28
35
44
41
47
50
7
39
5
42
25
33
3
48

Player 2:
16
24
36
6
34
11
8
30
26
15
9
10
14
1
12
4
32
13
18
46
37
29
20
45
49`;

}
