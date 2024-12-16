//AO2019 D20
import data from './day20_input.js';

function parse(str) {
    let grid = str.split('\n').map((l) => l.split(''));
    let height = grid.length;
    let width = grid[0].length;
    let portals = [];
    grid.forEach((l, i) => {
        l.forEach((v, j) => {
            if (v === '.') {
                if (/[A-Z]/.test(grid[i - 1][j])) {
                    //up
                    let name = grid[i - 2][j] + grid[i - 1][j];
                    portals.push({ name, pos: [i - 1, j], inner: i - 3 > 0 });
                }
                if (/[A-Z]/.test(grid[i + 1][j])) {
                    //down
                    let name = grid[i + 1][j] + grid[i + 2][j];
                    portals.push({
                        name,
                        pos: [i + 1, j],
                        inner: i + 3 < height
                    });
                }
                if (/[A-Z]/.test(grid[i][j - 1])) {
                    //left
                    let name = grid[i][j - 2] + grid[i][j - 1];
                    portals.push({ name, pos: [i, j - 1], inner: j - 3 > 0 });
                }
                if (/[A-Z]/.test(grid[i][j + 1])) {
                    //right
                    let name = grid[i][j + 1] + grid[i][j + 2];
                    portals.push({
                        name,
                        pos: [i, j + 1],
                        inner: j + 3 < width
                    });
                }
            }
        });
    });
    return { grid, portals };
}

function walkable(pos, grid) {
    let [i, j] = pos;
    let p = grid[i][j];
    if (p === '.') return true;
    if (/[A-Z]/.test(p)) {
        return [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ].some(([di, dj]) => {
            return grid[i + di] && grid[i + di][j + dj] === '.';
        });
    }
    return false;
}

function walk(start, dest, grid) {
    let visited = new Set();
    let queue = [{ p: start.pos, name: start.name, dist: 0 }];
    while (queue.length !== 0) {
        // if(queue.length % 10000 === 0) {
        //     console.log(queue.length);
        // }
        let pos = queue.shift();
        if (pos.p + '' === dest.pos + '') {
            return pos.dist - 1;
        }
        let [x, y] = pos.p;
        let points = [
            [x - 1, y],
            [x + 1, y],
            [x, y - 1],
            [x, y + 1]
        ]
            .filter((p) => walkable(p, grid) && !visited.has(p + ''))
            .map((p) => {
                return { p, dist: pos.dist + 1 };
            });
        points.forEach((p) => visited.add(p.p + ''));
        queue = [...queue, ...points];
    }
    return -1;
}

function graph({ grid, portals }, innerOuter = false) {
    let graph = {};
    portals.forEach((p, i) => {
        portals.forEach((_p, j) => {
            if (i !== j) {
                let key = p.name;
                if (innerOuter) {
                    key = p.name + ':' + (p.inner ? 'i' : 'o');
                }
                graph[key] = graph[key] || [];
                let dist = walk(p, _p, grid);
                if (dist !== -1) {
                    graph[key].push({ name: _p.name, dist, inner: _p.inner });
                }
            }
        });
    });
    return graph;
}

function shortest(graph, start, dest, getNeighbors) {
    let visited = new Set();
    let dist = { [start]: 0 };
    let current = start;
    while (true) {
        getNeighbors(graph, current)
            .filter((v) => !visited.has(v.name))
            .forEach((v) => {
                let d = dist[v.name];
                let _d = dist[current] + v.dist;
                if (d === undefined) {
                    dist[v.name] = _d;
                    d = _d;
                }
                if (d > _d) {
                    dist[v.name] = _d;
                }
            });
        visited.add(current);
        let m = Number.MAX_VALUE;
        let shortestNode;
        Object.entries(dist).forEach(([k, v]) => {
            if (v < m && !visited.has(k)) {
                m = v;
                shortestNode = k;
            }
        });
        if (!shortestNode || shortestNode === dest) {
            break;
        }
        current = shortestNode;
    }
    return dist[dest] - 1;
}

function getNeighbors(G, _name) {
    let [name, inout, level] = _name.split(':');
    level = parseInt(level, 10);
    let nodes = G[name + ':' + inout]
        .filter((n) => {
            if (level === 0) {
                return n.inner || /(AA|ZZ)/.test(n.name);
            }
            if (level > 0) {
                return !/(AA|ZZ)/.test(n.name);
            }
            return true;
        })
        .map((n) => {
            if (/(AA|ZZ)/.test(n.name)) {
                return { name: [n.name, 'o', 0].join(':'), dist: n.dist };
            }
            let dl = n.inner ? 1 : -1;
            let _inout = n.inner ? 'o' : 'i';
            return {
                name: [n.name, _inout, level + dl].join(':'),
                dist: n.dist
            };
        });
    return nodes;
}

let G = graph(parse(data()));
console.log(shortest(G, 'AA', 'ZZ', (graph, name) => graph[name]));

G = graph(parse(data()), true); //
console.log(shortest(G, 'AA:o:0', 'ZZ:o:0', getNeighbors));

function sample1() {
    return `
         A           
         A           
  #######.#########  
  #######.........#  
  #######.#######.#  
  #######.#######.#  
  #######.#######.#  
  #####  B    ###.#  
BC...##  C    ###.#  
  ##.##       ###.#  
  ##...DE  F  ###.#  
  #####    G  ###.#  
  #########.#####.#  
DE..#######...###.#  
  #.#########.###.#  
FG..#########.....#  
  ###########.#####  
             Z       
             Z       
`;
}

function sample2() {
    return `
                   A               
                   A               
  #################.#############  
  #.#...#...................#.#.#  
  #.#.#.###.###.###.#########.#.#  
  #.#.#.......#...#.....#.#.#...#  
  #.#########.###.#####.#.#.###.#  
  #.............#.#.....#.......#  
  ###.###########.###.#####.#.#.#  
  #.....#        A   C    #.#.#.#  
  #######        S   P    #####.#  
  #.#...#                 #......VT
  #.#.#.#                 #.#####  
  #...#.#               YN....#.#  
  #.###.#                 #####.#  
DI....#.#                 #.....#  
  #####.#                 #.###.#  
ZZ......#               QG....#..AS
  ###.###                 #######  
JO..#.#.#                 #.....#  
  #.#.#.#                 ###.#.#  
  #...#..DI             BU....#..LF
  #####.#                 #.#####  
YN......#               VT..#....QG
  #.###.#                 #.###.#  
  #.#...#                 #.....#  
  ###.###    J L     J    #.#.###  
  #.....#    O F     P    #.#...#  
  #.###.#####.#.#####.#####.###.#  
  #...#.#.#...#.....#.....#.#...#  
  #.#####.###.###.#.#.#########.#  
  #...#.#.....#...#.#.#.#.....#.#  
  #.###.#####.###.###.#.#.#######  
  #.#.........#...#.............#  
  #########.###.###.#############  
           B   J   C               
           U   P   P               
`;
}

function sample3() {
    return `
             Z L X W       C                 
             Z P Q B       K                 
  ###########.#.#.#.#######.###############  
  #...#.......#.#.......#.#.......#.#.#...#  
  ###.#.#.#.#.#.#.#.###.#.#.#######.#.#.###  
  #.#...#.#.#...#.#.#...#...#...#.#.......#  
  #.###.#######.###.###.#.###.###.#.#######  
  #...#.......#.#...#...#.............#...#  
  #.#########.#######.#.#######.#######.###  
  #...#.#    F       R I       Z    #.#.#.#  
  #.###.#    D       E C       H    #.#.#.#  
  #.#...#                           #...#.#  
  #.###.#                           #.###.#  
  #.#....OA                       WB..#.#..ZH
  #.###.#                           #.#.#.#  
CJ......#                           #.....#  
  #######                           #######  
  #.#....CK                         #......IC
  #.###.#                           #.###.#  
  #.....#                           #...#.#  
  ###.###                           #.#.#.#  
XF....#.#                         RF..#.#.#  
  #####.#                           #######  
  #......CJ                       NM..#...#  
  ###.#.#                           #.###.#  
RE....#.#                           #......RF
  ###.###        X   X       L      #.#.#.#  
  #.....#        F   Q       P      #.#.#.#  
  ###.###########.###.#######.#########.###  
  #.....#...#.....#.......#...#.....#.#...#  
  #####.#.###.#######.#######.###.###.#.#.#  
  #.......#.......#.#.#.#.#...#...#...#.#.#  
  #####.###.#####.#.#.#.#.###.###.#.###.###  
  #.......#.....#.#...#...............#...#  
  #############.#.#.###.###################  
               A O F   N                     
               A A D   M                     
`;
}
