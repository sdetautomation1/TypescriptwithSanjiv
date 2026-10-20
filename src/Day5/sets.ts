

let studentRollNo=new Set<number>();

studentRollNo.add(10);
studentRollNo.add(20);
studentRollNo.add(30);
studentRollNo.add(40);
studentRollNo.add(50);

console.log(studentRollNo);

let city =new Set<string>();

city.add('Pune');
city.add('Mumbai');
city.add('Banglore');
city.add('Hydrabad');

console.log(city);


let fruits=new Set(['Banana','Apple','Mango','Avacado','Cashew'])

console.log(fruits);

for (let fruit of fruits){
    console.log(fruit);
    
}

console.log('----------------------------');


for (let fruit of fruits.values()){
    console.log(fruit);
    
}

console.log('----------------------------keys');
for (let fruit of fruits.keys()){
    console.log(fruit);
    
}

console.log('--------------forEach');

fruits.forEach(x=>console.log(x));

console.log('----delete Cashew');

console.log(fruits.has('Cashew'));

fruits.delete('Cashew');

console.log(fruits);
console.log(fruits.has('Cashew'));

console.log('-----clear Set');

//fruits.clear()
console.log(fruits);


console.log(fruits.size);

fruits.add('Almond');

console.log(fruits);


// Union type in Sets

const student:Set<string|number|boolean>= new Set();

student.add('Kausar');
student.add(21);
student.add(true);

console.log(student);

//Order dosent mater in Sets
const employee:Set<string|number|boolean>= new Set([101,'Rahiv',true]);

console.log(employee);

//read Only Set 

const job:ReadonlySet<string>= new Set(['QA','BackEndDev','AppDev','ScrumMaster','Release Manager']);

console.log(job);









