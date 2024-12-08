const data = 3017957;
// const data = 5;

function game1() {
    let t = Date.now();
    let elfs = [...Array(data)].map((_, i) => i + 1);
    while (elfs.length !== 1) {
        let len = elfs.length;
        elfs = elfs.filter((e, i) => i % 2 === 0);
        if (len % 2 === 1) elfs.unshift(elfs.pop()!);
    }
    return [elfs[0], Date.now() - t];
}
console.log('Part 1', game1());

function game2() {
    let t = Date.now();
    let elfs = [...Array(data)].map((_, i) => i + 1);
    while (elfs.length !== 1) {
        let len = elfs.length;
        let i = 0;
        let target: Record<number, boolean> = {};
        while (true) {
            let t = Math.floor((len - i) / 2) + i * 2;
            if (t >= len) break;
            target[t] = true;
            i++;
        }
        elfs = elfs.filter((e, i) => !target[i]);
        elfs = [...elfs.slice(i), ...elfs.slice(0, i)];
    }
    return [elfs[0], Date.now() - t];
}
console.log('Part 2', game2());
