//AOC2018 D4
import data from './day4_input.js';

function parse(s) {
    let records = s
        .split('\n')
        .map((l) => {
            let [y, m, d, hr, mi, id] = l.match(/\d+/g).map(Number);
            let time = new Date(l.match(/\[(.*)\]/)[1]);
            return { time, l, id, date: [m, d].join('-'), hr, mi };
        })
        .sort((a, b) => a.time - b.time);
    let guards = {};
    let currentGuard, startSleep;
    records.forEach((r) => {
        if (r.l.match(/begins shift/)) {
            currentGuard = r.id;
            guards[r.id] = guards[r.id] || Array(60).fill(0);
        }
        if (r.l.match(/falls asleep/)) {
            startSleep = r.mi;
        }
        if (r.l.match(/wakes up/)) {
            for (let i = startSleep; i < r.mi; i++) {
                guards[currentGuard][i] = guards[currentGuard][i] ?? 0;
                guards[currentGuard][i] += 1;
            }
        }
    });
    return guards;
}

function solve(s) {
    let guards = Object.entries(parse(s));
    let g = guards.sort((a, b) => {
        return (
            b[1].reduce((a, c) => a + c, 0) - a[1].reduce((a, c) => a + c, 0)
        );
    })[0];
    let max = Math.max(...g[1]);
    console.log('part1', Number(g[0]) * g[1].findIndex((n) => n === max));

    g = guards.sort((a, b) => {
        return Math.max(...b[1]) - Math.max(...a[1]);
    })[0];
    max = Math.max(...g[1]);
    console.log('part2', Number(g[0]) * g[1].findIndex((n) => n === max));
}

solve(data());

function sample() {
    return `
[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up
    `.trim();
}
