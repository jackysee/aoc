//import data from './day24_input.ts';

/*

w = input_digit
x = !!((z % 26) + b != w)
z = Math.floor(z / a)
z *= 25*x+1
z += (w+c)*x


when a == 1, z = z * 26 + w + c (push w+c to base 26)
when a == 26, x needs to be 0, so z = old_z - b

A: 1 10 13 ==> push A + 13
B: 1 13 10 ==> push B + 10
C: 1 13 3  ==> push C + 3
D: 26 -11 1 ==> pop D = C + 3 - 11
E: 1 11 9 ==> push E + 9
F: 26 -4 3 ==> pop F = E + 9 - 4
G: 1 12 5 ==> push G + 5
H: 1 12 1 ==> push H + 1
I: 1 15 0 ==> push I
J: 26 -2 13  ==> pop J = I - 2
K: 26 -5 7 ==>  pop K = H + 1 - 5
L: 26 -11 15 ==> pop L = G + 5 - 11
M: 26 -13 12 ==> pop M = B + 10 - 13
N: 26 -10 8 ==> pop N = A + 13 - 10
 
C + 3 - 11 = D
E + 9 - 4 = F
I - 2 = J
H + 1 - 5 = K
G + 5 - 11 = L
B + 10 - 13 = M 
A + 13 - 10 = N

Part 1: 69914999975369
Part 2: 14911675311114

*/
