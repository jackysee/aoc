import data from './day7_input.ts';
// import data from './day7_sample.ts';

let _id = 0;
const id = () => {
    _id++;
    return _id;
};
type entry = { id: number; name: string; parent: number } & (
    | { type: 'file'; fileSize: number }
    | { type: 'dir' }
);
const entries: entry[] = [{ name: '/', type: 'dir', id: id(), parent: -1 }];
let cwd = entries[0];

data()
    .split('\n')
    .forEach((l) => {
        const cmd = l.split(' ');
        if (cmd[1] === 'cd') {
            if (cmd[2] === '/') {
                cwd = entries[0];
            } else if (cmd[2] === '..') {
                if (cwd.id === 1) return;
                cwd = entries.find((e) => e.id === cwd.parent)!;
            } else {
                cwd = entries.find(
                    (e) => e.parent === cwd.id && e.name === cmd[2]
                )!;
            }
        }
        if (cmd[1] === 'ls') return;
        if (cmd[0] === 'dir') {
            const name = cmd[1];
            entries.push({ name, type: 'dir', id: id(), parent: cwd.id });
        }
        if (/^\d+$/.test(cmd[0])) {
            entries.push({
                name: cmd[1],
                type: 'file',
                id: id(),
                parent: cwd.id,
                fileSize: Number(cmd[0])
            });
        }
    });

const folderSize = (id: number): number =>
    entries
        .filter((e) => e.parent === id)
        .reduce(
            (a, e) => a + (e.type === 'file' ? e.fileSize : folderSize(e.id)),
            0
        );

const sizes = entries
    .filter((e) => e.type === 'dir')
    .map((e) => folderSize(e.id));

const A = sizes.filter((s) => s <= 100000).reduce((a, c) => a + c, 0);
console.log(A);

const required = 30000000 - (70000000 - folderSize(1));
const B = sizes.sort((a, b) => a - b).find((s) => s >= required);
console.log(B);
