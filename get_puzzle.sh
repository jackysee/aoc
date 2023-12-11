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
const lines = data.split('\n');


EOF

echo "day$2.ts written"
