import data from './day23_input.ts';

const arr = data()
    .split('\n')
    .map((l) => l.split(' '));

function run(M: Record<string, number> = {}) {
    const getVal = (n: string | number) =>
        /[a-z]/.test(n + '') ? M[n] || 0 : +n;
    let i = 0;
    let mulCount = 0;
    while (arr[i]) {
        let [op, x, y] = arr[i];
        if (op === 'set') M[x] = getVal(y);
        if (op === 'sub') M[x] = (M[x] || 0) - getVal(y);
        if (op === 'mul') {
            M[x] = (M[x] || 0) * getVal(y);
            mulCount++;
        }
        if (op === 'jnz' && getVal(x) !== 0) i += getVal(y);
        else i++;
    }
    return mulCount;
}

console.log('Part 1', run());

/*
 *
 *
  b = 106700
  c = b + 17000
  do { 
      f = 1
      d = 2
      do { 
          e = 2
          do { 
              g = d 
              g *= e
              g -= b
              if(g == 0) {
                f = 0
              }
              e += 1
              g = e
              g -= b
          } while(g !== 0)
          d += 1
          g = d
          g -= b
      } while(g !== 0)
      if(f == 0)
        h += 1
      g = b
      g -= c
      if(g == 0) return 
      b += 17
   } while(true)

*/

const isPrime = (n: number) => {
    for (let i = 2, s = Math.sqrt(n); i <= s; i++)
        if (n % i === 0) return false;
    return n !== 1;
};

let h = 0;
for (let b = 106700; b <= 106700 + 17000; b += 17) {
    if (!isPrime(b)) h++;
}
console.log('Part 2', h);
