
function getNodes(str) {
    return str.split('\n').reduce((m, l) => {
        let [parent, child] = l.split(')');
        m[child] = parent;
        return m;
    }, {});
}


console.log(getNodes(sample()));





function sample() {
    return `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;
}
