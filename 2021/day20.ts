import data from './day20_input.ts';
// import data from './day20_sample.ts';

let [alg, imgStr] = data().trim().split('\n\n');

interface ImageMap {
    [key: string]: string;
}
interface Image {
    map: ImageMap;
    bg: string;
}

let imgSrc: ImageMap = {};
imgStr.split('\n').forEach((line, y) => {
    line.split('').forEach((pixel, x) => {
        imgSrc[`${x},${y}`] = pixel;
    });
});

function getIndex(img: Image, x: number, y: number) {
    let binaryStr = [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1]
    ]
        .map((p) => {
            let pixel = img.map[p + ''];
            if (pixel === undefined) pixel = img.bg;
            return pixel === '#' ? '1' : '0';
        })
        .join('');
    return parseInt(binaryStr, 2);
}

function enhance(img: Image) {
    let points = Object.keys(img.map).map((s) => s.split(',').map(Number));
    let xs = points.map((p) => p[0]);
    let ys = points.map((p) => p[1]);
    let minX = Math.min(...xs);
    let maxX = Math.max(...xs);
    let minY = Math.min(...ys);
    let maxY = Math.max(...ys);
    let result: ImageMap = {};
    for (let y = minY - 1; y <= maxY + 1; y++) {
        for (let x = minX - 1; x <= maxX + 1; x++) {
            let idx = getIndex(img, x, y);
            result[[x, y] + ''] = alg[idx];
        }
    }
    let bg = img.bg;
    if (bg === '.' && alg[parseInt('000000000', 2)] === '#') {
        bg = '#';
    } else if (bg === '#' && alg[parseInt('111111111', 2)] === '.') {
        bg = '.';
    }
    return { map: result, bg };
}

let img = { map: imgSrc, bg: '.' };
for (let i = 0; i < 50; i++) {
    img = enhance(img);
    if (i === 2 || i == 49) {
        console.log(
            `Part ${i === 2 ? '1' : '2'}`,
            Object.values(img.map).filter((p) => p === '#').length
        );
    }
}
