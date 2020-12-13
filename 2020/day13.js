function parse(str) {
  let [t, buses] = str.split("\n");
  buses = buses.split(",")
    .map(x => x === 'x'?'x':parseInt(x, 10));
  return {
    t: parseInt(t, 10), 
    buses
  };
}

function part1(str) {
  const d = parse(str);
  let min, idx = 0;
  d.buses.forEach((v, i) => {
      if(v === 'x')
        return;
      v = v - (d.t % v);
      if(min === undefined || v < min) {
        min = v;
        idx = i;
      }
    });
    return min * d.buses[idx];
}

console.log(part1(data()));







function sample1() {
  return `0
17,x,13,19`;
}


function data() {
  return `1000655
17,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,571,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,x,x,x,x,23,x,x,x,x,x,29,x,401,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,19`;
}
