export default () => `Monkey 0:
  Starting items: 96, 60, 68, 91, 83, 57, 85
  Operation: new = old * 2
  Test: divisible by 17
    If true: throw to monkey 2
    If false: throw to monkey 5

Monkey 1:
  Starting items: 75, 78, 68, 81, 73, 99
  Operation: new = old + 3
  Test: divisible by 13
    If true: throw to monkey 7
    If false: throw to monkey 4

Monkey 2:
  Starting items: 69, 86, 67, 55, 96, 69, 94, 85
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 6
    If false: throw to monkey 5

Monkey 3:
  Starting items: 88, 75, 74, 98, 80
  Operation: new = old + 5
  Test: divisible by 7
    If true: throw to monkey 7
    If false: throw to monkey 1

Monkey 4:
  Starting items: 82
  Operation: new = old + 8
  Test: divisible by 11
    If true: throw to monkey 0
    If false: throw to monkey 2

Monkey 5:
  Starting items: 72, 92, 92
  Operation: new = old * 5
  Test: divisible by 3
    If true: throw to monkey 6
    If false: throw to monkey 3

Monkey 6:
  Starting items: 74, 61
  Operation: new = old * old
  Test: divisible by 2
    If true: throw to monkey 3
    If false: throw to monkey 1

Monkey 7:
  Starting items: 76, 86, 83, 55
  Operation: new = old + 4
  Test: divisible by 5
    If true: throw to monkey 4
    If false: throw to monkey 0`;
