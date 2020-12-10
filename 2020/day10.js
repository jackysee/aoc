//AOC2020 D10

const toIntList = str => str.split('\n').map(s => parseInt(s, 10));

function findConfig(str) {
    const list = toIntList(str);
    list.push(Math.max(...list) + 3); //device built-in adapters
    const sorted = list.sort((a, b) => a - b);
    const stats = sorted.reduce((a, n, i) => {
        const prev = i === 0? 0 : sorted[i-1];
        const count = a[n - prev] || 0;
        a[n - prev] = count + 1;
        return a;
    }, {});
    return { sorted, stats };
}

const result = findConfig(data());
console.log(result.stats[1] * result.stats[3]);

function getCombo(num) {
    if(num < 0)  return 0;
    if(num === 0) return 1;
    return getCombo(num - 1) + getCombo(num - 2) + getCombo(num - 3);
}

const deltas = result.sorted.map((n, i) => n - (i === 0? 0 : result.sorted[i - 1]))

const ones = deltas.reduce((a, n, i) => {
    const prev = i === 0? 0 :deltas[i-1];
    if(n === 1) {
        if(prev !== 1){
            a.push(1);
        } else {
            a[a.length - 1] += 1;
        }
    }
    return a;
}, []);

console.log(ones.reduce((a,c) => a * getCombo(c), 1));

function sample2() {
    return `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;
}

function sample1(){
    return `16
10
15
5
1
11
7
19
6
12
4`;
}



function data() {
    return `8
40
45
93
147
64
90
125
149
145
111
126
9
146
38
97
103
6
122
34
18
35
96
86
116
29
59
118
102
26
66
17
74
94
5
114
128
1
75
47
141
58
65
100
63
12
53
25
106
136
15
82
22
117
2
80
79
139
7
81
129
19
52
87
115
132
140
88
109
62
73
46
24
69
101
110
16
95
148
76
135
142
89
50
72
41
39
42
56
51
57
127
83
121
33
32
23`;
}
