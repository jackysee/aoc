function parse(str) {
  let [t, buses] = str.split("\n");
  buses = buses.split(",").filter(x => x !== "x").map(x => parseInt(x, 10));
  return {
    t: parseInt(t, 10), 
    buses
  };
}

const d = parse(data());
console.log(d);
let min, idx = 0;
d.buses.map(b => b - (d.t % b))
    .forEach((v, i) => {
      console.log(v);
      if(min === undefined || v < min) {
        min = v;
        idx = i;
      }
    })

console.log(min * d.buses[idx]);


function data() {
  return `1000655
17,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,571,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,x,x,x,x,23,x,x,x,x,x,29,x,401,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,19`;
}
