const num = 29000000;

let presents: number[] = [];
for (let i = 1; i < num / 10; i++) {
    for (let j = i; j < num / 10; j = j + i) {
        if (!presents[j]) presents[j] = 10;
        presents[j] = presents[j] + i * 10;
    }
}

console.log(
    'Part 1',
    presents.findIndex((v) => v >= num)
);

presents = [];
for (let i = 1; i < num / 10; i++) {
    let visit = 0;
    for (let j = i; j < num / 10; j = j + i) {
        if (visit >= 50) break;
        if (!presents[j]) presents[j] = 11;
        presents[j] = presents[j] + i * 11;
        visit += 1;
    }
}

console.log(
    'Part 2',
    presents.findIndex((v) => v >= num)
);
