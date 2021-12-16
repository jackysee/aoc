import data from './day16_input.ts';

const hexToBit = (h: string) => parseInt(h, 16).toString(2).padStart(4, '0');
const toInt = (b: string) => parseInt(b, 2);
const toBitStr = (s: string) => s.split('').map(hexToBit).join('');

type Packet = {
    version: number;
    typeId: number;
    lengthTypeId: string | undefined;
    value: number | undefined;
    packets: Packet[];
    packetLen: number;
};

const parsePacket = (s: string): Packet | undefined => {
    let version = toInt(s.slice(0, 3));
    let typeId = toInt(s.slice(3, 6));
    let value = undefined;
    let lengthTypeId = undefined;
    let packets = [];
    let packetLen = 0;
    if (typeId === 4) {
        let i = 6;
        let val = [];
        while (true) {
            let v = s.slice(i, i + 5);
            val.push(...v.slice(1));
            i += 5;
            if (v[0] === '0') break;
        }
        value = toInt(val.join(''));
        packetLen = i;
    } else {
        //operator
        lengthTypeId = s.slice(6, 6 + 1);
        if (lengthTypeId === '0') {
            let totalLen = toInt(s.slice(7, 7 + 15));
            let i = 7 + 15;
            let a = 0;
            while (true) {
                let p = parsePacket(s.slice(i))!;
                packets.push(p);
                i += p.packetLen;
                if (i === totalLen + 7 + 15) break;
            }
            packetLen = i;
        }
        if (lengthTypeId === '1') {
            let n = toInt(s.slice(7, 7 + 11));
            let i = 7 + 11;
            while (true) {
                let p = parsePacket(s.slice(i))!;
                packets.push(p);
                i += p.packetLen;
                if (packets.length === n) break;
            }
            packetLen = i;
        }
    }
    return {
        version,
        typeId,
        value,
        packetLen,
        lengthTypeId,
        packets
    };
};

const versionSum = (p: Packet): number => {
    return p.version + p.packets.reduce((a, c) => a + versionSum(c), 0);
};

console.log('Part 1', versionSum(parsePacket(toBitStr(data()))!));

const evaluate = (p:Packet) :number => {
    if(p.typeId === 0) {
        return p.packets.reduce((a, c) => a + evaluate(c), 0);
    }
    if(p.typeId === 1) {
        return p.packets.reduce((a, c) => a * evaluate(c), 1);
    }
    if(p.typeId === 2) {
        return Math.min(...p.packets.map(evaluate));
    }
    if(p.typeId === 3) {
        return Math.max(...p.packets.map(evaluate));
    }
    if(p.typeId === 5) {
        return evaluate(p.packets[0]) > evaluate(p.packets[1]) ? 1 : 0;
    }
    if(p.typeId === 6) {
        return evaluate(p.packets[0]) < evaluate(p.packets[1]) ? 1 : 0;
    }
    if(p.typeId === 7) {
        return evaluate(p.packets[0]) == evaluate(p.packets[1]) ? 1 : 0;
    }
    if(p.typeId === 4) return p.value!;
    return 0;
}
console.log('Part 2', evaluate(parsePacket(toBitStr(data()))!));
