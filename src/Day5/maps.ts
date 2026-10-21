let student = new Map<number, string>();

student.set(101, 'Ramesh');
student.set(102, 'Mahesh');
student.set(103, 'Suresh');
student.set(103, 'Vikas'); // Override the old value with new data

//Map does not allow duplicate Keys however values can be duplicate

console.log(student);

// Using tuple
let fruit = new Map<number, string>([[11, 'apple'], [12, 'banana'], [13, 'Orange'], [14, 'Cherry']]);
console.log('-------------------------');
console.log(fruit);
console.log('-------------------------');
console.log(fruit.get(11));

console.log('-------------------------');
// data retrival 

for (let i of fruit.values()) {
    console.log(i);
}

console.log('-------------------------');

for (let i of fruit.keys()) {
    console.log(i);
}
console.log('de struct-----------------------');
for (let [key, value] of fruit) {
    console.log(key, value);

}
console.log('de struct---with entries--------------------');
for (let [key, value] of fruit.entries()) {
    console.log(key, value);

}
console.log('for Each--------------------');
fruit.forEach((x, y) => console.log(x, y));

// Union type 
let employee = new Map<number | string, string>();

employee.set('A101', 'Rakesh');
employee.set(100, 'Captain');

console.log(employee);

//read only maps

const rmap = new Map<number, string>([[101, 'ramesh'], [102, 'suresh'], [103, 'vignesh']]);


console.log(rmap);

let readonlyMap: ReadonlyMap<number, string> = rmap;











