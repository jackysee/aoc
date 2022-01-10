import data from './day16_input.ts';

interface Sue {
    id: number;
    attrs: Record<string, number>;
}

let arr: Sue[] = data()
    .split('\n')
    .map((l) => {
        let m = l.match(/^Sue (\d+):\s*(.*)$/)!;
        let id = Number(m[1]);
        let attrs = Object.fromEntries(
            m[2].split(',').map((l) => {
                let [k, v] = l.split(':').map((s) => s.trim());
                return [k, Number(v)];
            })
        );
        return { id, attrs };
    });

console.log(arr);
