/* Arrays: are used to store similar data  */


let fruits: string[] = ['apple', 'banana', 'mango', 'grapes'];

console.log(fruits);

let weekday: number[] = [1, 2, 3, 4, 5, 6, 7];

console.log(weekday);

/* Genric Array */

let marks: Array<number> = [20, 30, 40, 70];
let vegetable: Array<string> = ['potato', 'Onion', 'beans', 'ladyfinger'];

console.log(marks);
console.log(vegetable);


console.log(marks[0]);
console.log(marks[1]);

// using loops

for (let i of marks) {
    console.log(i);
}

for (let i in marks) {
    console.log(`Index ${i} we have ${marks[i]}`);
}

/* Methods in Arrays
push to insert the element at end
pop to remove the element at end
shift remove the element from start
unshift insert the element at start
map transfrom the array

filter to filter the elements based on condition
slice to get sub array
splice 
*/
weekday.push(66, 77);

console.log(weekday);

fruits.push('papaya');
console.log(fruits);

fruits.shift();
console.log(fruits);

fruits.unshift('pineapple');
console.log(fruits);

let dubllemarks= marks.map(x=> x*2);

console.log(marks);
console.log(dubllemarks);

let fullCaseArray= fruits.map(x=> x.toUpperCase());

console.log(fruits);

console.log(fullCaseArray);

let filteredPrice= marks.filter(x=> x>60);
console.log(marks);
console.log(filteredPrice);

let filtterFruits =fruits.filter(x=> x.includes('apple'));
console.log(fruits);

console.log(filtterFruits);

let searchMango= fruits.filter(x=> x==='mango');
console.log(searchMango);

let slicedArray= fruits.slice(2,4);
console.log(fruits);

console.log(slicedArray);


console.log(fruits);

fruits.splice(3,0,'apple');

console.log(fruits);

// Const vs let Array : reassignemnet is not allowed 

// readyonly Array : we cant modify data

let city: readonly string []= ['Pune','Mumbai']

//Union Arrays: 

let student1: (string| number) []= ['rajan',1];
console.log(student1);



































