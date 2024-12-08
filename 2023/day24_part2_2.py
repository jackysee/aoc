import sys
import re
import math
from collections import namedtuple
from functools import reduce

Hailstone = namedtuple('Hailstone', ('x', 'y', 'z', 'dx', 'dy', 'dz'))

def is_positive_integer(x):
	return x > 0 and math.floor(x) == x

def main():
	hailstones = []
	for line in open('./day24_input.txt').readlines():
		hailstones.append(Hailstone(*map(int, re.split(r'\s*[,@]\s*', line))))
	# s_r = x_r+y_r+z_r
	# sd_r = dx_r+dy_r+dz_r
	s, sd = [], []
	for h in hailstones:
		s.append(h.x+h.y+h.z)
		sd.append(h.dx+h.dy+h.dz)

	# s_r : s_i (mod (sd_i - sd_r))
	for sd_r in range(0, 1000):
		if sd_r in sd: # can't be parallel
			continue
		m_and_s = [[(sd_i - sd_r), s_i % (sd_i - sd_r)] for s_i, sd_i in zip(s, sd)]
		for i in range(len(m_and_s)):
			# positive thinking
			if m_and_s[i][0] < 0:
				m_and_s[i][0] = -m_and_s[i][0]
				m_and_s[i][1] = m_and_s[i][1] + m_and_s[i][0]
		m_and_s.sort(key=lambda p: p[0], reverse=True)
		m = []
		s_ = []
		# remove non co primes
		while m_and_s:
			m_i, s_i = m_and_s.pop(0)
			m.append(m_i)
			s_.append(s_i)
			m_and_s = [(m_j, s_j) for (m_j, s_j) in m_and_s if math.gcd(m_j, m_i) == 1]
		s_r = chinese_remainder(m, s_)
		if all(is_positive_integer((s_r-s_i)/(sd_i-sd_r)) for s_i, sd_i in zip(s, sd)):
			print(s_r)

# stolen from https://github.com/shlomif/modint/blob/master/modint/code/modint/__init__.py
class ChineseRemainderConstructor:
    def __init__(self, bases):
        """Accepts a list of integer bases."""
        self._bases = bases
        p = 1
        for x in bases:
            p *= x
        self._prod = p
        self._inverses = [p//x for x in bases]
        self._muls = [inv * self.mul_inv(inv, base) for base, inv
                      in zip(self._bases, self._inverses)]

    def rem(self, mods):
        """Accepts a list of corresponding modulos for the bases and
        returns the accumulated modulo.
        """
        ret = 0
        for mul, mod in zip(self._muls, mods):
            ret += mul * mod
        return ret % self._prod

    def mul_inv(self, a, b):
        """Internal method that implements Euclid's modified gcd algorithm.
        """
        initial_b = b
        x0, x1 = 0, 1
        if b == 1:
            return 1
        while a > 1:
            div, mod = divmod(a, b)
            a, b = b, mod
            x0, x1 = x1 - div * x0, x0
        return (x1 if x1 >= 0 else x1 + initial_b)

def chinese_remainder(n, mods):
    """Convenience function that calculates the chinese remainder directly."""
    return ChineseRemainderConstructor(n).rem(mods)

if __name__ == '__main__':
	main()
