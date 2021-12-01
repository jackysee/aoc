//AOC2018 D15

function parse(s) {
    let arr = s.split('\n').map(l => l.split(''));
    let map = {}, units = [];
    for(let y=0; y<arr.length; y++) {
        for(let x=0; x<arr[y].length; x++) {
            let sq = arr[y][x];
            if(sq !== '#') {
                map[[x,y]] = '.';
            }
            if(sq === 'G') {
                units.push({ pos:[x,y], hp:300, elf:false });
            }
            if(sq === 'E') {
                units.push({ pos:[x,y], hp:300, elf:true });
            }
        }
    }
    return { map, units };
}

function order(units){
    units.sort((a,b) => {
        let [x1,y1] = a.pos;
        let [x2,y2] = b.pos;
        if(y1 === y2) return x1 - x2;
        return y1 - y2;
    });
    return units;
}

function shortestPath(source, dest, map, units) {
    let visited = new Set();
    let queue = [ { pos:source, dist:0, trail:[] } ];
    while(queue.length !== 0) {
        // if(queue.length % 10000 === 0) {
        //     console.log(queue.length);
        // }
        let pt = queue.shift();
        if(''+pt.pos === dest+'') {
            return pt;
        }
        let [x,y] = pt.pos;
        let points = [ [x-1,y], [x+1,y], [x,y-1], [x,y+1] ]
            .filter(p => {
                return map[p] === '.'  &&
                    !units.find(u => u.pos+'' === p+'')
                    && !visited.has(p+'');
            })
            .map(p => ({ 
                pos:p, 
                dist: pos.dist + 1, 
                trail:[...pt.trail, p] 
            }))
        points.forEach(p => visited.add(p.pos+''));
        queue = [...queue, ...points];
    }
    return -1;
}

function battle(s) {
    let { map, units } = parse(s);
    order(units);
    let i = 0;
    while(true) {
        if(i < 1) { break; }

        units.forEach(u => {
            let enemies = units.filter(_u => u.elf !== _u.elf);

        });
        i++;
    }
}
















/*

#######       #######
#G..#E#       #...#E#   E(200)
#E#E.E#       #E#...#   E(197)
#G.##.#  -->  #.E##.#   E(185)
#...#E#       #E..#E#   E(200), E(200)
#...E.#       #.....#
#######       #######
*/

function sample1() {
    return `
#######
#G..#E#
#E#E.E#
#G.##.#
#...#E#
#...E.#
#######
    `.trim();
}




function data() {
    return `
################################
##########G###.#################
##########..G#G.G###############
##########G......#########...###
##########...##.##########...###
##########...##.#########G..####
###########G....######....######
#############...............####
#############...G..G.......#####
#############.............######
############.............E######
######....G..G.........E....####
####..G..G....#####.E.G.....####
#####...G...G#######........####
#####.......#########........###
####G.......#########.......####
####...#....#########.#.....####
####.#..#...#########E#..E#..###
####........#########..E.#######
###......#..G#######....########
###.......G...#####.....########
##........#............#########
#...##.....G......E....#########
#.#.###..#.....E.......###.#####
#######................###.#####
##########.......E.....###.#####
###########...##........#...####
###########..#####.............#
############..#####.....#......#
##########...######...........##
#########....######..E#....#####
################################
    `.trim();
}
