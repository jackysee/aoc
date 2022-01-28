import re
from collections import deque
from collections import defaultdict

def parse_ops(input):
    return [[s if not s or s.isalpha() else int(s) for s in l]
            for l in re.findall(r'(.{3}) (.) ?([-\w]+)?', input)]

def proc(ops, pid, rcvq, sndq, counter):
    i, regs = 0, defaultdict(int, p=pid)
    get = lambda r: regs[r] if isinstance(r, str) else r
    while 0 <= i < len(ops):
        op, reg, val = ops[i]
        val = get(val)
        if   op == 'set': regs[reg] = val
        elif op == 'add': regs[reg] += val
        elif op == 'mul': regs[reg] *= val
        elif op == 'mod': regs[reg] %= val
        elif op == 'rcv':
            while not rcvq: yield
            regs[reg] = rcvq.popleft()
        elif op == 'snd': sndq.append(get(reg)); counter[pid] += 1
        elif op == 'jgz' and get(reg) > 0: i += val-1
        i += 1

def solve():
    ops, q0, q1, c = parse_ops(input), deque(), deque(), [0,0]
    q = deque([proc(ops[:], 0, q0, q1, c), proc(ops[:], 1, q1, q0, c)])
    while True:
        print(c[1], len(q0), len(q1))
        cur = q[0]; q.rotate(); next(cur)
        print(c[1], len(q0), len(q1))
        if not (q0 or q1): return c[1]


f=open("18.in",'r')
input = f.read().strip()
f.close()

print(solve())
