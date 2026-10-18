# 📦 TypeScript — Arrays & Tuples | Day 4

> **Learning Goal:** Master storing, accessing, and manipulating collections of data using Arrays and Tuples in TypeScript, with type safety enforced at every step.

---

## 📌 Why Do We Need Arrays and Tuples?

Variables store **one value at a time**. But real-world data comes in collections:

```typescript
// Bad — individual variables for a list
let fruit1: string = 'apple';
let fruit2: string = 'banana';
let fruit3: string = 'mango';

// Good — one array holds them all
let fruits: string[] = ['apple', 'banana', 'mango'];
```

| Type    | What it stores                          | Order matters | Fixed length | Mixed types |
|---------|-----------------------------------------|---------------|--------------|-------------|
| Array   | Similar data of the **same type**       | Yes           | No           | No (by default) |
| Tuple   | Fixed, ordered items of **mixed types** | Yes           | Yes          | Yes         |

---

# PART 1 — ARRAYS

---

## 1. 🔵 Declaring Arrays

### Method 1 — Square Bracket Syntax (Most Common)

```typescript
let fruits: string[] = ['apple', 'banana', 'mango', 'grapes'];
let weekday: number[] = [1, 2, 3, 4, 5, 6, 7];

console.log(fruits);  // ['apple', 'banana', 'mango', 'grapes']
console.log(weekday); // [1, 2, 3, 4, 5, 6, 7]
```

### Method 2 — Generic Array Syntax

```typescript
let marks: Array<number> = [20, 30, 40, 70];
let vegetables: Array<string> = ['potato', 'Onion', 'beans', 'ladyfinger'];

console.log(marks);      // [20, 30, 40, 70]
console.log(vegetables); // ['potato', 'Onion', 'beans', 'ladyfinger']
```

> Both `string[]` and `Array<string>` are identical — use whichever reads better to you. The bracket syntax is more common in day-to-day TypeScript.

---

## 2. 🔵 Accessing Array Elements

Arrays are **zero-indexed** — the first element is at index `0`.

```typescript
let marks: Array<number> = [20, 30, 40, 70];

console.log(marks[0]); // 20  ← first element
console.log(marks[1]); // 30  ← second element
console.log(marks[3]); // 70  ← fourth (last) element
console.log(marks[9]); // undefined ← out of bounds, no error in JS/TS
```

---

## 3. 🔵 Iterating Arrays with Loops

### `for-of` — get the **value**

```typescript
let marks: Array<number> = [20, 30, 40, 70];

for (let i of marks) {
  console.log(i); // 20, 30, 40, 70
}
```

### `for-in` — get the **index**

```typescript
for (let i in marks) {
  console.log(`Index ${i} we have ${marks[i]}`);
}
// Index 0 we have 20
// Index 1 we have 30
// Index 2 we have 40
// Index 3 we have 70
```

### `forEach` — functional iteration

```typescript
marks.forEach((value, index) => {
  console.log(`[${index}] = ${value}`);
});
```

---

## 4. 🔵 Array Methods — Complete Guide

### `push` — Add Element at the END

```typescript
let weekday: number[] = [1, 2, 3, 4, 5, 6, 7];
weekday.push(66, 77); // can add multiple at once
console.log(weekday); // [1, 2, 3, 4, 5, 6, 7, 66, 77]

let fruits: string[] = ['apple', 'banana', 'mango', 'grapes'];
fruits.push('papaya');
console.log(fruits); // ['apple', 'banana', 'mango', 'grapes', 'papaya']
```

### `pop` — Remove Element from the END

```typescript
let removed = fruits.pop();
console.log(removed); // 'papaya'  ← returns the removed element
console.log(fruits);  // ['apple', 'banana', 'mango', 'grapes']
```

### `shift` — Remove Element from the START

```typescript
fruits.shift();       // removes 'apple'
console.log(fruits);  // ['banana', 'mango', 'grapes']
```

### `unshift` — Add Element at the START

```typescript
fruits.unshift('pineapple');
console.log(fruits); // ['pineapple', 'banana', 'mango', 'grapes']
```

### Summary Table — Add/Remove Methods

| Method     | Where   | Action  | Returns          |
|------------|---------|---------|------------------|
| `push()`   | End     | Add     | New array length |
| `pop()`    | End     | Remove  | Removed element  |
| `unshift()`| Start   | Add     | New array length |
| `shift()`  | Start   | Remove  | Removed element  |

---

### `map` — Transform Every Element (creates a NEW array)

```typescript
let marks: Array<number> = [20, 30, 40, 70];

let doubleMarks = marks.map(x => x * 2);
console.log(marks);        // [20, 30, 40, 70]   ← original unchanged
console.log(doubleMarks);  // [40, 60, 80, 140]  ← new array

let fruits: string[] = ['apple', 'banana', 'mango', 'grapes'];
let upperFruits = fruits.map(x => x.toUpperCase());
console.log(fruits);       // ['apple', 'banana', 'mango', 'grapes']  ← unchanged
console.log(upperFruits);  // ['APPLE', 'BANANA', 'MANGO', 'GRAPES']
```

> **Key point:** `map` never modifies the original array. It returns a brand new array.

---

### `filter` — Keep Elements That Match a Condition (creates a NEW array)

```typescript
let marks: Array<number> = [20, 30, 40, 70];

let highMarks = marks.filter(x => x > 60);
console.log(marks);      // [20, 30, 40, 70]  ← original unchanged
console.log(highMarks);  // [70]

let fruits: string[] = ['pineapple', 'banana', 'mango', 'apple'];

let apples = fruits.filter(x => x.includes('apple'));
console.log(apples); // ['pineapple', 'apple']

let mango = fruits.filter(x => x === 'mango');
console.log(mango);  // ['mango']
```

---

### `slice` — Extract a Sub-Array (non-destructive)

```typescript
// slice(startIndex, endIndex)  — endIndex is EXCLUDED
let fruits: string[] = ['pineapple', 'banana', 'mango', 'grapes', 'papaya'];

let sliced = fruits.slice(2, 4);
console.log(fruits);  // original unchanged
console.log(sliced);  // ['mango', 'grapes']  ← index 2 and 3 (not 4)
```

| Call              | Extracts                          |
|-------------------|-----------------------------------|
| `slice(1)`        | From index 1 to end               |
| `slice(1, 3)`     | Index 1 and 2 (end index excluded)|
| `slice(-2)`       | Last 2 elements                   |

---

### `splice` — Add/Remove at Any Position (modifies original)

```typescript
// splice(startIndex, deleteCount, ...itemsToInsert)
let fruits: string[] = ['pineapple', 'banana', 'mango', 'grapes'];

fruits.splice(3, 0, 'apple'); // at index 3, delete 0, insert 'apple'
console.log(fruits); // ['pineapple', 'banana', 'mango', 'apple', 'grapes']

// Remove 2 elements starting at index 1
fruits.splice(1, 2);
console.log(fruits); // ['pineapple', 'apple', 'grapes']
```

### `slice` vs `splice`

| Feature          | `slice`                  | `splice`                         |
|------------------|--------------------------|----------------------------------|
| Modifies original| No ✅                     | Yes ⚠️                           |
| Returns          | New sub-array            | Array of removed elements        |
| Use for          | Reading/copying a portion| Inserting or removing at position|

---

## 5. 🔵 Special Array Types

### `readonly` Array — No Modifications Allowed

```typescript
let city: readonly string[] = ['Pune', 'Mumbai'];

city.push('Delhi'); // TypeScript ERROR: Property 'push' does not exist on type 'readonly string[]'
city[0] = 'Nashik'; // TypeScript ERROR: Index signature in type 'readonly string[]' only permits reading
```

> Use `readonly` when you want to guarantee an array is never mutated — perfect for configuration data or test fixtures.

### `const` vs `readonly` Arrays

```typescript
const fruits = ['apple', 'mango'];
fruits.push('banana'); // ALLOWED — const only prevents reassignment
fruits = ['kiwi'];     // ERROR — cannot reassign const

let city: readonly string[] = ['Pune'];
city.push('Mumbai');   // ERROR — readonly prevents all mutations
city = ['Delhi'];      // ALLOWED — can reassign the variable
```

### Union Arrays — Mixed Types

```typescript
// Array that can hold string OR number
let student1: (string | number)[] = ['Rajan', 1];
console.log(student1); // ['Rajan', 1]

// Array of strings OR booleans
let flags: (string | boolean)[] = ['active', true, 'admin', false];
```

---

# PART 2 — TUPLES

---

## 6. 🟣 What is a Tuple?

A **Tuple** is a special TypeScript array with:
- A **fixed number** of elements
- **Fixed types** at each position
- **Order matters** — you must follow the declared type order

```typescript
// Array — same type, flexible length
let scores: number[] = [10, 20, 30, 40]; // OK
scores.push(50); // OK

// Tuple — fixed types at fixed positions
let student: [number, string, boolean] = [1, 'Rajiv', true];
student[0] = 'hello'; // TypeScript ERROR — position 0 must be number
```

---

## 7. 🟣 Declaring and Accessing Tuples

```typescript
let student: [number, string, boolean] = [1, 'Rajiv', true];

// Access by index
console.log(student[0]); // 1      (number)
console.log(student[1]); // Rajiv  (string)
console.log(student[2]); // true   (boolean)
```

### Iterating a Tuple

```typescript
// for-of — values
student.forEach(x => {
  console.log(x); // 1, Rajiv, true
});

// for-in — indexes
for (let index in student) {
  console.log(student[index]);
}

// for-of
for (let value of student) {
  console.log(value);
}
```

---

## 8. 🟣 Tuple Methods

Tuples share methods with arrays:

```typescript
let studentMarks: [number, number, number, number] = [78, 72, 76, 99];

console.log(studentMarks);           // [78, 72, 76, 99]
studentMarks.reverse();
console.log(studentMarks);           // [99, 76, 72, 78]
```

| Method      | Purpose                        |
|-------------|--------------------------------|
| `push()`    | Add to end                     |
| `pop()`     | Remove from end                |
| `shift()`   | Remove from start              |
| `unshift()` | Add to start                   |
| `slice()`   | Get sub-tuple (non-destructive)|
| `splice()`  | Add/remove at position         |
| `reverse()` | Reverse in place               |
| `forEach()` | Iterate each element           |
| `find()`    | Find first matching element    |
| `filter()`  | Filter by condition            |
| `map()`     | Transform elements             |

---

## 9. 🟣 Optional Tuple Elements

Use `?` to mark an element as optional:

```typescript
let access: [string, string?] = ['testuser'];       // only one element — valid
console.log(access); // ['testuser']

access = ['testuser2', 'admin'];                     // two elements — also valid
console.log(access); // ['testuser2', 'admin']
```

---

## 10. 🟣 Tuple Destructuring

Pull tuple values into named variables:

```typescript
let student: [number, string, boolean] = [1, 'Rajiv', true];

let [studentId, name, isIndianCitizen] = student;

console.log(name);            // Rajiv
console.log(studentId);       // 1
console.log(isIndianCitizen); // true
```

> **Destructuring** is much more readable than using `student[0]`, `student[1]` etc.

---

## 11. 🟣 Rest Elements in Tuples

A tuple can have a **fixed start** and a **variable rest**:

```typescript
// First: employee ID (number), then name (string), then any number of skills (string)
let employee: [number, string, ...string[]] = [101, 'Ramesh', 'C', 'C++', 'Java'];

let [id, empName, ...skills] = employee;
console.log(id);      // 101
console.log(empName); // Ramesh
console.log(skills);  // ['C', 'C++', 'Java']
```

---

## 12. 🟣 Spread Operator with Arrays and Tuples

The spread operator `...` expands an array/tuple into individual elements.

### Copy an Array (avoid mutation)

```typescript
let marks: number[] = [20, 90, 40];
let newArray = [...marks];      // creates a COPY

marks.push(70);

console.log(marks);    // [20, 90, 40, 70]  ← original modified
console.log(newArray); // [20, 90, 40]       ← copy unaffected
```

### Merge / Combine Arrays

```typescript
const frontend: string[] = ['html', 'css'];
const backend: string[] = ['java', 'node.js'];

const fullstack = [...frontend, ...backend];
console.log(fullstack); // ['html', 'css', 'java', 'node.js']
```

### Spread vs `push`

```typescript
let a = [1, 2];
let b = [3, 4];

// push adds entire array as one element (nested)
a.push(b); // [1, 2, [3, 4]]  ← WRONG if you want flat

// spread merges flatly
let c = [...a, ...b]; // [1, 2, 3, 4]  ← CORRECT
```

---

## 13. 🟣 `readonly` Tuple

```typescript
let ctsEmp: readonly [string, string] = ['Ramesh', 'Suresh'];

ctsEmp[0] = 'Mahesh'; // TypeScript ERROR — cannot modify readonly tuple
ctsEmp.push('Ganesh'); // TypeScript ERROR — push not allowed
console.log(ctsEmp);   // ['Ramesh', 'Suresh']
```

---

## 🚀 Arrays vs Tuples — Complete Comparison

| Feature            | Array `T[]`                 | Tuple `[T1, T2, T3]`             |
|--------------------|-----------------------------|----------------------------------|
| Length             | Dynamic (can grow/shrink)   | Fixed                            |
| Types              | All elements same type      | Each position has its own type   |
| Order enforced     | Not by type                 | Yes — strictly by position       |
| Mutation           | Allowed by default          | Allowed by default               |
| `readonly` support | Yes                         | Yes                              |
| Best for           | Lists, collections          | Records, rows with known fields  |
| TypeScript safety  | Type of elements            | Type AND position                |

---

## 🧠 Key Takeaways

1. **`string[]` and `Array<string>`** are identical — both are valid TypeScript.
2. **`map`** and **`filter`** never modify the original array — they always return a new one.
3. **`slice`** is non-destructive; **`splice`** mutates the original array.
4. **`push/pop`** work at the end; **`unshift/shift`** work at the start.
5. **Tuples** enforce type AND position — `[number, string]` means first MUST be number.
6. **Spread operator `...`** copies arrays shallowly — nested objects are still references.
7. **`readonly`** arrays/tuples prevent all mutations at compile time — great for test data.
8. **Destructuring** makes tuple values readable with meaningful names.
9. **`for-of`** is preferred for arrays (values); **`for-in`** gives string indexes.

---

## 📝 Practice Exercises

1. Create a `string[]` of 5 cities. Add a city at the start and end, then remove one from each end. Print after each step.
2. Use `map` on a `number[]` to create a new array where each number is squared.
3. Use `filter` to get all fruits from an array that have more than 5 characters.
4. Use `slice` to get the middle 3 elements from an array of 7 numbers.
5. Create a tuple `[string, number, boolean]` for an employee record, then destructure it into named variables.
6. Use the spread operator to merge a `frontend` and `backend` skills array into `fullstack`.
7. Create a `readonly string[]` and try modifying it — observe the TypeScript error.
8. Create a rest-element tuple `[number, string, ...string[]]` for a student with multiple subjects.

---

*Day 4 — Arrays & Tuples | Part of the TypeScript Learning Series*
