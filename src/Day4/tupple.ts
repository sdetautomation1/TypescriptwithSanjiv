// Tupple : is a special type of array which have fixed no of elements. 
// Order is imp here. 

let student: [number, string, boolean] = [1, 'Rajiv', true];

/* console.log(student); */

// Data retrival 
/* console.log(student[0]);
console.log(student[1]);
console.log(student[2]); */

/* for (let index in student) {
    console.log(student[index]);
}

for (let value of student) {
    console.log(value);
} */
// Methods in tupple
/* 
push
pop
slice
splice
shift
unshift
find
filter
map

forEach : itrator 
*/
//student.pop();

//console.log(student);

student.forEach(x => {
    console.log(x);

});


let studentMarks: [number, number, number, number] = [78, 72, 76, 99];
console.log(studentMarks);

studentMarks.reverse();
console.log(studentMarks);

//optional parameter :
let access: [string, string?] = ['testuser'];
console.log(access);


access = ['testuser2', 'admin']

console.log(access);

// destructuring the tupple :

console.log(student);

let [StudentId, Name, IndianCitizen] = student;

console.log(Name);


// rest elements

let employee: [number, string, ...string[]] = [101, 'ramesh', 'c', 'c++', 'java'];

//spread operator

let marks:number[]=[20,90,40];

let newArray= [...marks];

marks.push(70);

console.log(marks);
console.log(newArray);


const frontend=['html','css'];

const backend:string[]=['java','node.js'];

console.log(typeof(backend));
//combine both arrays using spread operator
const fullstack= [...frontend,...backend];

console.log(fullstack);

// readyonly tupple 

let ctsemp:readonly[string,string]=['ramesh','suresh'];
console.log(ctsemp);




























