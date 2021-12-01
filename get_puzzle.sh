#!/bin/bash
data=$(curl -s -b cookiefile https://adventofcode.com/$1/day/$2/input)

tee $1/day$2_input.ts <<EOF
export default function() { 
    return \`${data}\`;
}
EOF
