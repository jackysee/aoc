//AOC2018 D2
function parse(s) { return s.split('\n'); }

function part1(s) {
    let list = parse(s);
    let two = 0;
    let three = 0;
    list.forEach(l => {
        let s = new Set(l.split(''));
        let twoCounted = false;
        let threeCounted = false;
        [...s].forEach(i => {
            if(twoCounted && threeCounted) {
                return;
            }
            let c = l.match(new RegExp(i, 'g')).length;
            if(!twoCounted && c === 2) {
                two++;
                twoCounted = true;
            }
            if(!threeCounted && c === 3) {
                three++;
                threeCounted = true;
            }
        });
    });
    return two * three;
}

function part2(s) {
    let list = parse(s);
    let result;
    list.forEach(l1 => {
        if(result) return;
        list.forEach(l2 => {
            if(result) return;
            if(l1 === l2) return;
            let diff = [];
            l1.split('').forEach((l, i) => {
                if(l !== l2[i]) diff.push(i);
            });
            if(diff.length === 1) {
                result = l1.slice(0, diff[0]) + l1.slice(diff[0] + 1)
            }
        });
    });
    return result;
}

console.log(part1(data()));
console.log(part2(data()));


function data() {
    return `
kbqwtcvzgumhpwelrnaxydpfuj
kbqwtcvzgsmhpoelryaxydiqij
kbqwpcvzssmhpoelgnaxydifuj
kbqgtcvxgsmhpoalrnaxydifuj
kbqwtcvygsmhpoelrnaxydiaut
kbqwtcvjgsmhpoelrnawydzfuj
kbqftcvzgsmhpoeprnaxydifus
rbqwtcgzgsxhpoelrnaxydifuj
kbqwtlvzgvmhpoelrnaxkdifuj
kbqwtcvzgsmhpolqrnaxydifub
kbqbtcqzgsmhposlrnaxydifuj
kbqwmcvzgswhpoelxnaxydifuj
kbqwtyvzgsmhkoelrnsxydifuj
khqwtcvzgsmhqoelinaxydifuj
koqwtcvzcsmhpoelrnaxydizuj
kbqwtcvzlsmhpoezrnaxydmfuj
kbqwtcvzdsmhpoelrjaxydifij
kbqwtcvzgsmhpoelrncxyjifuk
kbtwtcvzgsmhpoelonaxydiwuj
kbqwfcrzgsmhpoelrnaeydifuj
kbqutcvkgsmhpoelrnfxydifuj
kbqwtcvzgsmvvoelrnaxydihuj
kbqwtcvzhymhpoelrnaxydifyb
kbqctcvzgumhpoalrnaxydifuj
kuqktcvzgsmhpoelrnaxydieuj
kbqwtcvzgsmvpozlrnaxydifmj
kbqwtcvzgsmhpojlraaxydiouj
kbqwtcvzgmmhpoelknaxydizuj
kbwwtcvzgsmhpoefrnaxydifij
kbqwucvzgsmhpoelvnahydifuj
kbqwtcvzpsmhpgelrqaxydifuj
kblqtcvzgsmhpoeirnaxydifuj
kbqwtcvzgsmhpovlrnabydifum
kbqwwcvzgsmhpoelrnaoydnfuj
kyqwdcvzgsmhpoelrnaxfdifuj
kbqftcvzgsmxpoelknaxydifuj
kbqwtsvzksmhpoelqnaxydifuj
kbqwtcvzgsmhplelrnauydifux
kbqytcvzgsmhpkelrnaxydefuj
kbqwtcvzgsmjjoelrlaxydifuj
kbqvtcvzgsmhpoelnnaxydafuj
kbqwtcvzgsjhioelrnaxpdifuj
kbqptcvpgsmhpoelrnaxydiful
kbqwjcazgimhpoelrnaxydifuj
kbqxtcvzgwmhpaelrnaxydifuj
kbqwtcezgsmhqoelrnaxydifub
kbqwtcvzgsmhooelynaxydifuf
kbqwtwvzgsmkpoelrnaxrdifuj
nbqwtcvugsmhpoelrnzxydifuj
kbvwqcvzgsmhpoelsnaxydifuj
kbqwtcyzjsmhpoelrnaxymifuj
kbqwtcvzgsmhpoclrnaxykzfuj
kbbwtcvzgsmhyodlrnaxydifuj
kbwwtcvzgsmytoelrnaxydifuj
kbmwtcczgpmhpoelrnaxydifuj
ubqwtcvzgsmmpoblrnaxydifuj
kbqwtcvzgrmhpoelrnaxnrifuj
kbqwhcvzgsmhpoelynaaydifuj
kbqwtcvzgsmtpoelrcpxydifuj
kdqwtchzgsmhpoelrmaxydifuj
qbqrncvzgsmhpoelrnaxydifuj
kbqwtcvzghshpoelrnaxodifuj
kbqwhcvzgsmhpoelknaxydiwuj
ebqwtcvzgsmhpoelrotxydifuj
kbqwacvzusmhpoelryaxydifuj
kbqwtcvggsmhpoelrnaxygifyj
kbqwtcvzgsmhpoelrnaxycwfuo
kzqwzcvzgsmhpoelrxaxydifuj
khqwtcvzgsmhpoelrnaxldifyj
kbqwtbtzgsmhpoelrnaxydifud
gbqwtcvzgqmhpoelrnaxydifrj
kbqdtqvzgwmhpoelrnaxydifuj
kbqwscvzgsmhpoelrpaxypifuj
kmqwtcdzgsmhpoelenaxydifuj
klqwtcvvgsmhpoelrfaxydifuj
kbuwtcvzgsmhpoelrtaxyuifuj
kbqwtcvrgomhpoelrnaxydijuj
kbqwtgvzgsmhzoelrnpxydifuj
kbqltcvzgsmhooeljnaxydifuj
kbqwtcvzgbmxpoelrnaxydivuj
kbqdtcmzgsmhpoelrnaxydmfuj
kbqwtcazgsmhpoplrnacydifuj
kbqztcvegsmhpoelrnvxydifuj
kbqwtcvzgsmhpoecrnaxydzfsj
kbqwtcvzgsmepoelrnaqydifuf
kbqwtcqzgsmhpoelrnoxydivuj
kbqwtcvzgsmhpoeylnaxydhfuj
kbqwtcvfgsmhpoelrnaxgdifyj
kbqwtcvzgsmhnbelrnaxyfifuj
kbqwtcvzgsmhpoelrnaxbdffmj
kwqwtcvogtmhpoelrnaxydifuj
kdqwtcvzggyhpoelrnaxydifuj
kbqwtuvzgtmhpoelrnaxydifxj
kbqctdvzcsmhpoelrnaxydifuj
kbqwtcvzgsmhpoblrniyydifuj
kbqwucvzzsmhpoelrnvxydifuj
kbqwtcvzgslzpoelrnaxydiruj
kbqwtdmzgsmhpwelrnaxydifuj
kbqwtcvzgsmhpoilrnaxqiifuj
kbqwtcvzgsmhpgelrnaxydisnj
kbdwtqvzgsmhpoelrnaxydivuj
kbqvtdvzgsmhpoelrjaxydifuj
kfqwtcvzgsmhpoeurnyxydifuj
kbqwtcvzgsmhpoglrnaxqkifuj
kbqwtcvrgsmhpoelrnajydifnj
xbqwpcvzgjmhpoelrnaxydifuj
kbqwtcvzgsmhpoelrdaxvdihuj
kbuwtcvzssmhpoklrnaxydifuj
kbqwtcvzgqmhpoelrnzxydifbj
kbqwtcvzgsmhsoeoknaxydifuj
kfqltcvzgsmhpoelrnaxydifnj
qbqwtsvzgsmhpoelrnaxodifuj
kbqwwevzgsmypoelrnaxydifuj
kbqwtcuzgimhpoelrnaxydffuj
kxqwlcvzgsmhpoelrnaxyrifuj
nbqwtcvzgsmhpoelryaxyiifuj
kbqwtcvzgsmhhoxlreaxydifuj
mbqwtcvzfsmxpoelrnaxydifuj
kbqwttvzgsmhpoeqrnaxidifuj
kbqwtcvzgamhpielrnaxyiifuj
rfqwtcvzgsmhpoelrnaxydifun
kbpwtqvzgsmbpoelrnaxydifuj
kbqwtcvzgsmhpoqlroaxydifua
hbqwtcvzksmhpoelrnaxydbfuj
kaqutcvzgsmhpoelrnaxydiiuj
kbqctcvzgsnhpoelrcaxydifuj
kbqwtnvzgsmhpoelrnaxydqfoj
kbqwtcvzhsmhpoelrnaxydifyb
ubqwtcvcgsmhooelrnaxydifuj
kbqwtcvrgsmhpoelrnaxtdivuj
kbqwtcvzgsmhplelrnmxydifaj
ebqwlcvzghmhpoelrnaxydifuj
hbqwtcvzgsmhpoelrnaqyeifuj
kbqstcvzgsmeprelrnaxydifuj
kbqwtcvogsthpoelrnnxydifuj
ybqwtcvzgdmhpoelrnaxydufuj
kbqutcvzgsmhpoelrnaxydifgx
kbqwtcvzgsmhpozlunadydifuj
kkqwtcvzgsmhpuefrnaxydifuj
kbqrtcvzgsmhpoelrnaxcdifuq
kbqwtcvzjsmupoelrnaxydiluj
kbqwmcvzgsuhpoelrnaxydifhj
kbqwfcvzgsmhpoelrnaxydkzuj
kbqatcvzgsdhpoeyrnaxydifuj
kbtwtcvzusmhpoelrxaxydifuj
kbqwtcwzgsmhpoelrnaxysofuj
kbqqtcvmgsmhpoevrnaxydifuj
kbqwjcvzgsmhpoelrnaxydhuuj
mbdwtcvzgsmhpoelqnaxydifuj
kbqwtcvlgsmhpoelrdaxydifaj
kbqwtcvzgsmmpoelrlaxydnfuj
kbqwtchfggmhpoelrnaxydifuj
kbqqtcvzgsyhpoelrnaxyoifuj
knqwtcvzqsmupoelrnaxydifuj
kdqdtcvzgsmhpoelrnaxydmfuj
kbqwtcvzgsmhptelrnawyhifuj
kbqwtcvzgrmhpoeqrnaxydifuw
kbnxtcvzgsmhpoelrnauydifuj
kbqwacvsgsmhpoelrnaxydifgj
kbqwtcvzgsmhpperrnaxydifuc
gbqwtcvzgsqhxoelrnaxydifuj
kbqwtcvzgsmhpoeljgaxydifwj
kbqktcvzgsmhpotlrnatydifuj
bbqwtcvzgsmhpoilrnaxydjfuj
kbqwecvdgsmhpoelrnaxypifuj
keqwtcvzgemhpotlrnaxydifuj
kbqptcvzgsmvpoelrnaxydixuj
kbqwbctzgsmhpoelrnaxydifup
kbqwtcvzgszhpbelrnzxydifuj
mbqwtcvtgsmhpoeyrnaxydifuj
kbqwtcvzgsmhqcelrhaxydifuj
kbqotcvzgsmhooelrnazydifuj
kbqwtcvzgsmhpoelmpaxyiifuj
kbqwtcvwgsmypoclrnaxydifuj
kbqwtcvsgskhpoelrnaxykifuj
kbqwtcvzgszvpoelrnwxydifuj
kbqwtcvzgsmhpoejonaxydrfuj
kbqwtcvzgsmhkoelrnazyqifuj
kbzwtzvzgsmhptelrnaxydifuj
kbqwtcdzgsmhptelrnaxydiduj
kbqwtcvzgamhpoelrnakyzifuj
kbqwtcvzgsmhpoeonnaxydifxj
kbqwtcvzgsmhpoeranaxydifej
kbqwscvzgsmhpoelunaxydimuj
cbqwtcvzgsmhpoelrdaxydefuj
vbqwtcjzgsmhpoelrnaxydifua
kmqwtcvzksmhpoeljnaxydifuj
kbqwtcvzgsmppojlrnasydifuj
kaqwtcvfgsmhpoelrnaxydiauj
khqwccvzgsmhpoelrnaxydifud
vbqwtcvzrsmhpoelrhaxydifuj
kuqwtcvzgsmhpoelgnaiydifuj
kbqwtcvzdsmhpbelvnaxydifuj
kbowtcvzgnmhpoelrfaxydifuj
kbqwtcvsgsmhfoejrnaxydifuj
kbqwtcvzgskhtoelrnxxydifuj
kbqwtcvzgtmhpoevrnaxydivuj
bbqptcgzgsmhpoelrnaxydifuj
kbqwtpvzgsmnpoelhnaxydifuj
kbqwtovzgsmmpoelrnaxydifuw
kbqwtcvzgsihpwelrnaxydsfuj
kbqwtcvzggmhpollrnaxydifsj
kbqwtcjzgsmhpoelrnaxyxifub
ebqwtcvzgsmzpoelrnaaydifuj
kbqwtcvzusmhpoelrnqxydijuj
obqwtcvzgsghpoelrnaxydifkj
kbrwtcvzmdmhpoelrnaxydifuj
kbqwtcvzxsmhpoblrnhxydifuj
kbqwacvzgsahpoelrnaxydiguj
kyqwtcvzgsmipoelrnlxydifuj
kbbwtcvzgsmhboelpnaxydifuj
kbqwtcvzgsmhpoelrnaxhdosuj
kbqwtgvzgxmhpoelrnaxyrifuj
pbqwtsvzgsmhpoelrnabydifuj
kbqrtcvzgsmhpsblrnaxydifuj
kbqwtcvzgsmhpoexrnaaycifuj
kbqxtcvzgsjhkoelrnaxydifuj
kbqwtcvzgsmhpxelrnaxydifby
lbxwtcvzgsmdpoelrnaxydifuj
kbqwtcczgsmhpoklrnzxydifuj
zbqwtcvzgsmhpoelrbaxydifui
krqwtcvzbsmhpoelrjaxydifuj
kbkwtcvzgsmhpoelrnaxydiacj
kbqwtcvzgszhpseprnaxydifuj
kbxwtcvzxsmhpoesrnaxydifuj
kbqwdcvzgsmhpoelrbaxygifuj
kbqwthkzgsmhhoelrnaxydifuj
klqwtchzgamhpoelrnaxydifuj
obqwtcvzgsvcpoelrnaxydifuj
kblwtcvzgsmhpoelrnanydifuw
kbqwtrvzgsmhpoelynaxydifug
kbqwtcvzgsmhcoelmnaxydkfuj
kbqwtcvzgsmhpotlqoaxydifuj
kaqatcvzgsmhpoelrnaxyiifuj
kbqttcvwgsmhpoelrnaxydifgj
kpqwtcvzgsmhpwelynaxydifuj
kbqwucvzgsmhpyelrnaxyxifuj
kbqwucvzgsmhprelrnaxyfifuj
kbqwthvzgsmhphelrnaxylifuj
kbqwtcvzosmhdoelrnaxwdifuj
kbqwtxvsgsphpoelrnaxydifuj
koqwtcvfghmhpoelrnaxydifuj
kbtwicvzpsmhpoelrnaxydifuj
kbawtcvzgsmhmoelrnaxyiifuj
kbqwtcvzgslhpbelrnaxydifuk
kbqttcvzgsmypoelrnaxydifua
kbqwtcvrgqmhpnelrnaxydifuj
kbqwtcvzghmhpoekpnaxydifuj
kbqwtcvzgsmupoelrnaxidifui
kbqwtcvzgsmhpbelrnaxrdifux

    `.trim();
}
