import data from './day12_input.js';
function getStars(str) {
    return str.split('\n').map((l, i) => {
        return {
            pos: [
                parseInt(l.match(/x=(-?\d+)/)[1], 10),
                parseInt(l.match(/y=(-?\d+)/)[1], 10),
                parseInt(l.match(/z=(-?\d+)/)[1], 10)
            ],
            vel: [0, 0, 0]
        };
    });
}

// console.log(getStars(data()));

function copy(stars) {
    return stars.map((s) => ({ pos: [...s.pos], vel: [...s.vel] }));
}

function applyGravity(_stars) {
    const stars = copy(_stars);
    for (let i = 0; i < stars.length; i++) {
        for (let j = 0; j < stars.length; j++) {
            if (i !== j) {
                const [x1, y1, z1] = stars[i].pos;
                const [x2, y2, z2] = stars[j].pos;
                stars[i].vel[0] += x1 === x2 ? 0 : x1 < x2 ? 1 : -1;
                stars[i].vel[1] += y1 === y2 ? 0 : y1 < y2 ? 1 : -1;
                stars[i].vel[2] += z1 === z2 ? 0 : z1 < z2 ? 1 : -1;
            }
        }
    }
    return stars;
}

function applyVelocity(_stars) {
    const stars = copy(_stars);
    for (let i = 0; i < stars.length; i++) {
        stars[i].pos[0] += stars[i].vel[0];
        stars[i].pos[1] += stars[i].vel[1];
        stars[i].pos[2] += stars[i].vel[2];
    }
    return stars;
}

function getEnergy(stars) {
    return stars.reduce((a, c) => {
        return (
            a +
            [...c.pos].reduce((a, c) => a + Math.abs(c), 0) *
                [...c.vel].reduce((a, c) => a + Math.abs(c), 0)
        );
    }, 0);
}

function getEnergyAfterSteps(str, steps) {
    let stars = getStars(str);
    for (let i = 0; i < steps; i++) {
        stars = applyGravity(stars);
        stars = applyVelocity(stars);
    }
    return getEnergy(stars);
}

// console.log(getEnergyAfterSteps(sample(), 10));
console.log(getEnergyAfterSteps(data(), 1000));

function getCycle(stars, dim) {
    const getId = (stars) =>
        stars.map((s) => s.pos[dim] + ',' + s.vel[dim]).join('|');
    let _id = getId(stars);
    let id;
    let count = 0;
    while (id !== _id) {
        stars = applyGravity(stars);
        stars = applyVelocity(stars);
        id = getId(stars);
        count++;
    }
    return count;
}

function lcm(...arr) {
    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    const _lcm = (x, y) => (x * y) / gcd(x, y);
    return [...arr].reduce((a, b) => _lcm(a, b));
}

function getStepsUntilRepeat(str) {
    let stars = getStars(str);
    return lcm(getCycle(stars, 0), getCycle(stars, 1), getCycle(stars, 2));
}

console.log(getStepsUntilRepeat(data()));

function sample() {
    return `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`;
}

function sample2() {
    return `<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`;
}
