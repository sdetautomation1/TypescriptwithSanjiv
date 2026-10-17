// short cut to format code in VS: Shift +Alf + F

// if keyword

let age = 20;
if (age > 18) {
    console.log('user is eligibe for vote');
}
console.log('Next statement');

// if else
let a = 11;

if (a % 2 == 0) {
    console.log(`${a} is even`);
}
else {
    console.log(`${a} is odd`);
}
console.log('next');


// if else ladder

let b = 40;
let c = 30;

if (a > b && a > c) {
    console.log(`${a} is bigger`);
}
else if (b > a && b > c) {
    console.log(`${b} is bigger`);
}
else {
    console.log(`${c} is bigger`);
}
console.log('next of if else ladder');
let week: number = 5;

//switch case: 

switch (week) {
    case 1: console.log('this is week 1');
        break;
    case 2: console.log('this is week 2');
        break;
    case 3: console.log('this is week 3');
        break;
    case 4: console.log('this is week 4');
        break;
    default: console.log('this is default case');
}
console.log('after switch case block');



let operation: string = 'evenOrodd';
let x = 23;
switch (operation) {
    case 'add': if (x % 2 == 0) {
        console.log(`${x} is Even`);
    };
        break;
    default: console.log('no matching operation found');
}
console.log('after EvenOdd operation');













