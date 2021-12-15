import data from './day15_input.ts';
// import data from './day15_sample.ts';

interface ValueMap {
    [key: string]: number;
}
let map: ValueMap = {};
let mx = 0;
let my = 0;
data()
    .trim()
    .split('\n')
    .forEach((line, y) =>
        line.split('').forEach((n, x) => {
            map[[x, y] + ''] = Number(n);
            if (x > mx) mx = x;
            if (y > my) my = y;
        })
    );

function getNeigbours(pos: string, map: ValueMap, visited: Set<string>) {
    let [x, y] = pos.split(',').map(Number);
    return [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1]
    ]
        .map((a) => a + '')
        .filter((p) => map[p] !== undefined && !visited.has(p));
}

function createPriorityQueue(){
    let items: [string, number][]  = [];
    const add = (e:string, p:number) => {
        let added = false;
        for(let i=0; i<items.length; i++) {
            if(p > items[i][1]) {
                items.splice(i, 0,  [e, p]);
                added = true;
                break;
            }
        }
        if(!added) items.push([e,p]);
    }
    const last = () => items.at(-1);
    const remove = (e:string) => {
        let i =items.findIndex(([_e]) => e === _e);
        if(i !== -1) items.splice(i, 1);
    }
    const get = (e:string) => {
        let i =items.findIndex(([_e]) => e === _e);
        if(i !== -1) return items[i][1];
    }
    const getIndex = (e:string) => {
        return items.findIndex(([_e]) => e === _e);
    }
    const setByIndex = (i:number, n:number) => items[i][1] = n;
    const getByIndex = (i:number) => items[i][1];
    return { add, last, remove, get, getIndex, setByIndex, getByIndex }
}

function dij(from: string, to: string, map: ValueMap) {
    let mapLen = Object.keys(map).length;
    console.log('map length = ',  mapLen);
    let visited = new Set<string>();
    let D = createPriorityQueue();
    D.add(from, 0);
    let current = from;
    while (current !== to) {
        if(visited.size % Math.floor(mapLen / 10) === 0) {
            console.log('visited', visited.size);
        }
        getNeigbours(current, map, visited).forEach((p) => {
            let i = D.getIndex(p);
            let d = D.get(current)! + map[p];
            if(i === -1) {
                D.add(p, d);
            } else if(d < D.getByIndex(i)!){
                D.setByIndex(i, d);
            }
        });
        visited.add(current);
        D.remove(current);
        current = D.last()![0];
    }
    return D.get(to);
}

let t = performance.now();
console.log(dij('0,0', `${mx},${my}`, map));
console.log(performance.now() - t + 'ms');

let _map2 = Object.entries(map)
    .map(([k, v]) => {
        let [x, y] = k.split(',').map(Number);
        let points = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let _v = v + i + j;
                if (_v > 9) _v = (_v + 1) % 10;
                points.push([[x + (mx + 1) * i, y + (my + 1) * j] + '', _v]);
            }
        }
        return points;
    })
    .flat();

let map2 = Object.fromEntries(_map2);
t = performance.now();
console.log(dij('0,0', `${(mx + 1) * 5 - 1},${(my + 1) * 5 - 1}`, map2));
console.log(performance.now() - t + 'ms');
