import data from './day1_input.ts';
// import data from './day1_sample.ts';
const lines = data().split('\n');
const sum = (a: number, c: number) => a + c;
const digitStr = 'one|two|three|four|five|six|seven|eight|nine';
const digitMap = Object.fromEntries(
    digitStr.split('|').map((s, i) => [s, i + 1 + ''])
);
const toNumStr = (s: string) => digitMap[s] || s;
const findValue = (re: string) => (s: string) => {
    const first = s.match(new RegExp(re));
    const last = s.match(new RegExp(`.*(${re})`));
    if (!first || !last) return 0;
    return Number(toNumStr(first[0]) + toNumStr(last[1]));
};
console.log('A', lines.map(findValue('\\d')).reduce(sum, 0));
console.log('B', lines.map(findValue(`\\d|${digitStr}`)).reduce(sum, 0));
