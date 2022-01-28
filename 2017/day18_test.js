const input = `
set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 826
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19
`.trim();
var commands = [];
input.split('\n').forEach((d) => {
    commands.push({ name: d.substring(0, 3), args: d.substring(4).split(' ') });
});

function Program(id) {
    this.registers = {};
    this.lastSound = '';
    this.index = 0;
    this.id = id;
    this.sendCount = 0;
    this.queue = [];
    this.registers['p'] = id;

    this.instP1 = {
        set: (a, b) => {
            this.registers[a] = this.parse(b);
            this.index++;
        },
        mul: (a, b) => {
            this.registers[a] *= this.parse(b);
            this.index++;
        },
        add: (a, b) => {
            this.registers[a] += this.parse(b);
            this.index++;
        },
        mod: (a, b) => {
            this.registers[a] = this.registers[a] % this.parse(b);
            this.index++;
        },
        snd: (a) => {
            this.lastSound = this.parse(a);
            this.index++;
        },
        jgz: (a, b) => {
            this.index += this.parse(a) > 0 ? this.parse(b) : 1;
        },
        rcv: (a) => {
            if (this.parse(a) > 0) {
                console.log('recovered', this.lastSound);
                return true;
            }
            this.index++;
        }
    };
    this.instP2 = {
        set: this.instP1.set,
        mul: this.instP1.mul,
        add: this.instP1.add,
        mod: this.instP1.mod,
        jgz: this.instP1.jgz,
        snd: (a) => {
            programs[(this.id + 1) % 2].queue.push(this.parse(a));
            this.index++;
            this.sendCount++;
        },
        rcv: (a) => {
            if (this.queue.length > 0) {
                this.registers[a] = this.queue.shift();
                this.index++;
            }
        }
    };
    Program.prototype.executeP1 = function () {
        return this.instP1[commands[this.index].name](
            ...commands[this.index].args
        );
    };
    Program.prototype.executeP2 = function () {
        return this.instP2[commands[this.index].name](
            ...commands[this.index].args
        );
    };
    Program.prototype.parse = function (b) {
        return isNaN(b) ? this.registers[b] : parseInt(b);
    };
    Program.prototype.finished = function () {
        return this.index < 0 || this.index >= commands.length;
    };
    Program.prototype.finishedOrStalled = function () {
        return (
            this.finished() ||
            (commands[this.index].name == 'rcv' && this.queue.length == 0)
        );
    };
}

// part 1
var prog = new Program(0);
while (!prog.executeP1());

// part 2
var programs = [new Program(0), new Program(1)];
do {
    programs.forEach((d) => {
        if (!d.finished()) d.executeP2();
    });
} while (!programs.reduce((a, b) => a && b.finishedOrStalled(), true));

console.log('program 1 send count:', programs[1].sendCount);
