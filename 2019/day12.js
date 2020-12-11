function getStars(str) {
    return str.split('\n').map((l, i) => {
        return {
            id: i,
            pos: [
                parseInt(l.match(/x=(-?\d+)/)[1], 10),
                parseInt(l.match(/y=(-?\d+)/)[1], 10),
                parseInt(l.match(/z=(-?\d+)/)[1], 10)
            ],
            vel: [0, 0, 0]
        };
    })
}

console.log(getStars(data()));

function applyGravity(stars) {
    
}

function data(){
    return `<x=3, y=2, z=-6>
<x=-13, y=18, z=10>
<x=-8, y=-1, z=13>
<x=5, y=10, z=4>`;
}
