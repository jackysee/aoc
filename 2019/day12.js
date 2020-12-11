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
    })
}

// console.log(getStars(data()));

function copy(stars) {
    return stars.map(s => ({ pos: [...s.pos], vel: [...s.vel]}))
}

function applyGravity(_stars) {
    const stars = copy(_stars);
    for(let i=0; i<stars.length; i++) {
        for(let j=0; j<stars.length; j++) {
            if(i !== j) {
                const [x1, y1, z1] = stars[i].pos;
                const [x2, y2, z2] = stars[j].pos;
                stars[i].vel[0] += x1 === x2? 0 : x1 < x2 ? 1 : -1;
                stars[i].vel[1] += y1 === y2? 0 : y1 < y2 ? 1 : -1;
                stars[i].vel[2] += z1 === z2? 0 : z1 < z2 ? 1 : -1;
            }
        }
    }
    return stars;
}

function applyVelocity(_stars) {
    const stars = copy(_stars);
    for(let i=0; i<stars.length; i++) {
        stars[i].pos[0] += stars[i].vel[0];
        stars[i].pos[1] += stars[i].vel[1];
        stars[i].pos[2] += stars[i].vel[2];
    }
    return stars;
}

function getEnergy(stars) {
    return stars.reduce((a, c) => {
        return a + 
            [...c.pos].reduce((a,c) => a + Math.abs(c), 0) *
            [...c.vel].reduce((a,c) => a + Math.abs(c), 0)
    }, 0);
}


function getEnergyAfterSteps(str, steps) {
    let stars = getStars(str);
    for(let i=0; i<steps; i++) {
        stars = applyGravity(stars);
        stars = applyVelocity(stars);
    }
    return getEnergy(stars);
}

// console.log(getEnergyAfterSteps(sample(), 10));
console.log(getEnergyAfterSteps(data(), 1000));


function getStepsUntilRepeat(stars) {
    return lcm(
        getCycle(stars, 0),
        getCycle(stars, 1),
        getCycle(stars, 2)
    )
}



function sample() {
    return `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`;
}

function data(){
    return `<x=3, y=2, z=-6>
<x=-13, y=18, z=10>
<x=-8, y=-1, z=13>
<x=5, y=10, z=4>`;
}
