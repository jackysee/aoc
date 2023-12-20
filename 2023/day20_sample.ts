export const ex1 = () =>
    `
broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a
`.trim();

export const ex2 = () =>
    `
broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output
`.trim();
