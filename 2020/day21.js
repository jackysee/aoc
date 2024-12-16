//AOC2020 D21
import data from './day21_input.js';

function parse(str) {
    return str.split('\n').map((l) => {
        let [ingred, allerg] = l.split('(contains ');
        return {
            ingred: ingred.match(/\w+/g),
            allerg: allerg.match(/\w+/g)
        };
    });
}

function findAllerg(data) {
    let map = {};
    data.forEach((d) => {
        d.allerg.forEach((a) => {
            map[a] = new Set(
                map[a] ? d.ingred.filter((_d) => map[a].has(_d)) : d.ingred
            );
            for (let j in map) {
                if (map[j].size === 1) {
                    for (let k in map) {
                        if (j !== k) {
                            map[k].delete([...map[j]][0]);
                        }
                    }
                }
            }
        });
    });
    return map;
}

function part1(str) {
    let data = parse(str);
    let map = findAllerg(data);
    const allAllerg = new Set(Object.values(map).flatMap((s) => [...s]));
    return data.reduce(
        (a, d) => a + d.ingred.filter((i) => !allAllerg.has(i)).length,
        0
    );
}

function part2(str) {
    let data = parse(str);
    let map = findAllerg(data);
    let ingred = Object.entries(map)
        .sort(([k1], [k2]) => {
            if (k1 < k2) return -1;
            if (k1 > k2) return 1;
            return 0;
        })
        .map(([k, v]) => [...v][0]);
    return ingred.join(',');
}

console.log(part1(data()));
console.log(part2(data()));

function sample() {
    return `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`;
}
