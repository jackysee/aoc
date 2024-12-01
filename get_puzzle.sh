#!/bin/bash

if [[ $# -ne 2 ]]; then
    echo 'usage: ./get_puzzle.sh 2021 1'
    exit 1
fi

data=$(curl -s -b cookiefile https://adventofcode.com/$1/day/$2/input)

tee $1/day$2_input.js <<EOF
export default () => \`${data}\`;
EOF

tee $1/day$2_sample.js <<EOF
export default () => \`

\`.trim();
EOF

echo "Data file written to $1/day$2_input.js"

tee $1/day$2.js << EOF
import data from './day${2}_input.js';
// import data from './day${2}_sample.js';
const lines = data().split('\n');


EOF

echo "day$2.ts written"
