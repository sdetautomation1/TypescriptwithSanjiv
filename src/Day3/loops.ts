
/* 
Short cut learned: Toggle Block Comment	Shift + Alt + A 
Single line comment: Ctl+ / 
*/



//loops 
//While loop, do While, for of, for in and for 

/* while(condition){
 code;
 increment/ decrement; 
 
}
 next statement */

let x = 21;

/* while (x <= 20) {
    console.log(x);
    x++;
}
console.log('loop is printed'); */

// Do While 

/* Do {
code;
increment/decrement;
}
While(condition)

next statemnet;
*/

// Do is pre conditional loop 
// Do while is post conditional loop 

do {
    console.log(x);
    x++;

}
while (x <= 20);
console.log('Do while is executed');

/* For loop
for(initilization ; condition; increment/decrement){
code
}

*/

for (let i = 1; i <= 10; i++) {
    console.log(i);
}
console.log('for loop is executed');


/* for in loop gives index
for(let i in array){
code; }
*/

let fruits: string[] = ['apple', 'cherry'];

for (let i in fruits) {
    console.log(`Index of ${fruits[i]} is ${i}`);
}

/* for of loop gives value

for (let index of datastructure){
code
} */


for (let i of fruits){
    console.log(i);
    
}


/*  Break and continue 
Break : to come out of loop once condition is met.

continue: skips the current iteration and goes for next
*/



