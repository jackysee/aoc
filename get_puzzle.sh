#!/bin/bash

if [[ $# -ne 2 ]]; then
    echo 'usage: ./get_puzzle.sh 2021 1'
    exit 1
fi

data=$(curl -s -b cookiefile https://adventofcode.com/$1/day/$2/input)

js_year="2018 2019 2020 2024"
ext='ts'
if [[ $js_year =~ $1 ]]; then 
    ext='js'
fi

if [ ! -f $1/day$2_input.$ext ]; then
    tee $1/day$2_input.$ext <<EOF
export default () => \`${data//$/\\$}\`;
EOF
    echo "Data file written to $1/day$2_input.$ext"
fi

if [ ! -f $1/day$2_sample.$ext ]; then
    tee $1/day$2_sample.$ext <<EOF
export default () => \`

\`.trim();
EOF
    echo "Data file written to $1/day$2_sample.$ext"
fi

if [ ! -f $1/day$2.$ext ]; then
    tee $1/day$2.$ext << EOF
import data from './day${2}_input.$ext';
// import data from './day${2}_sample.$ext';
const lines = data().split('\n');
// const M = data().split('\n').map(l => [...l]);

EOF
    echo "day$2.$ext written"
fi
