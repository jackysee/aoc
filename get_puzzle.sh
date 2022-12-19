#!/bin/bash

if [[ $# -ne 2 ]]; then
    echo 'usage: ./get_puzzle.sh 2021 1'
    exit 1
fi

data=$(curl -s -b cookiefile https://adventofcode.com/$1/day/$2/input)

tee $1/day$2_input.ts <<EOF
export default () => \`${data}\`;
EOF

tee $1/day$2_sample.ts <<EOF
export default () => \`

\`.trim();
EOF

echo "Data file written to $1/day$2_input.ts"

tee $1/day$2.ts << EOF
import data from './day${2}_input.ts';
// import data from './day${2}_sample.ts';

const ints = (s: string) => (s.match(/-?\d+/g) || []).map(Number);
const sum = (a: number, c: number) => a + c;
const asc = (a: number, b: number) => a - b;
const desc = (a: number, b: number) => b - a;
// prettier-ignore
const range = (a: number, b: number) => Array.from({length: b - a}, (_, n) => n + a);
// prettier-ignore
const DIRS = [[0,1],[0,-1],[1,0],[-1,0]];

let arr: number[] = data().split('\n').map(Number);

EOF

echo "day$2.ts written"
