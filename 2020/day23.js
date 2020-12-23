//AOC2020 D22

function parse(str) {
	let arr = str.split('').map(s => parseInt(s, 10));
	let map = {};
	arr.forEach((n, i) => {
	   map[n] =  arr[i+1 === arr.length? 0 : i+1]
	});
	return { map, curr:arr[0] };
}


function next(map, n, count = 1) {
    let result = [];
    for(let i=0; i<count; i++) {
        
    }
}

function game(str) {
    let { map, curr } = parse(str);
    let i = 0;
    while(i++ < 100) {
        let next = []
        
    }
}

console.log(parse(data()));

function sample() {
	return ``;
}

function data() {
	return `643719258`;
}
