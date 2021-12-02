#!/bin/bash

if [[ $# -ne 2 ]]; then
    echo 'usage: ./get_puzzle.sh 2021 1'
    exit 1
fi

data=$(curl -s -b cookiefile https://adventofcode.com/$1/day/$2/input)

tee $1/day$2_input.ts <<EOF
export default function() { 
    return \`${data}\`;
}
EOF

echo "File written to $1/day$2_input.ts"
