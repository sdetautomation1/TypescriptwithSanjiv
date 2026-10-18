# 🎯 TypeScript — Arrays & Tuples | Day 4 Interview Q&A

> Covers: Array declaration, access, all array methods, readonly, union arrays, Tuples, destructuring, rest elements, spread operator
> Difficulty: 🟢 Basic → 🟡 Intermediate → 🔴 Tricky / Advanced

---

## 🟢 BASIC QUESTIONS

---

### Q1. What is an Array in TypeScript and how is it different from JavaScript?

**Answer:**
An array stores multiple values of the **same type** in a single variable. TypeScript extends JavaScript arrays with **type safety** — the compiler enforces that only the declared type can be stored.

```typescript
// TypeScript — type enforced
let fruits: string[] = ['apple', 'banana', 'mango'];
fruits.push(42); // TypeScript ERROR: Argument of type 'number' not assignable to 'string'

// JavaScript — no enforcement
let fruits = ['apple', 'banana', 'mango'];
fruits.push(42); // allowed — no error
```

---

### Q2. What are the two ways to declare an array in TypeScript?

**Answer:**

```typescript
// Method 1 — Square bracket syntax (most common)
let fruits: string[] = ['apple', 'banana', 'mango'];
let marks: number[] = [20, 30, 40, 70];

// Method 2 — Generic Array syntax
let fruits2: Array<string> = ['apple', 'banana', 'mango'];
let marks2: Array<number> = [20, 30, 40, 70];
```

Both are **functionally identical** — the bracket syntax is preferred for readability.

---

### Q3. What is the difference between `push` / `pop` and `unshift` / `shift`?

**Answer:**

| Method      | Position | Action | Returns               |
|-------------|----------|--------|-----------------------|
| `push()`    | End      | Add    | New length of array   |
| `pop()`     | End      | Remove | The removed element   |
| `unshift()` | Start    | Add    | New length of array   |
| `shift()`   | Start    | Remove | The removed element   |

```typescript
let fruits: string[] = ['apple', 'banana', 'mango', 'grapes'];

fruits.push('papaya');    // ['apple', 'banana', 'mango', 'grapes', 'papaya']
fruits.pop();             // ['apple', 'banana', 'mango', 'grapes']
fruits.shift();           // ['banana', 'mango', 'grapes']   ← removed 'apple'
fruits.unshift('cherry'); // ['cherry', 'banana', 'mango', 'grapes']
```

---

### Q4. What does the `map` method do? Does it modify the original array?

**Answer:**
`map` creates a **brand new array** by transforming every element using a callback function. The original array is **never modified**.

```typescript
let marks: number[] = [20, 30, 40, 70];

let doubled = marks.map(x => x * 2);
console.log(marks);   // [20, 30, 40, 70]   ← original unchanged
console.log(doubled); // [40, 60, 80, 140]  ← new array

let fruits: string[] = ['apple', 'banana'];
let upper = fruits.map(x => x.toUpperCase());
console.log(upper);   // ['APPLE', 'BANANA']
```

---

### Q5. What does the `filter` method do? Give an example.

**Answer:**
`filter` returns a new array containing only the elements that pass the condition (return `true`). The original is unchanged.

```typescript
let marks: number[] = [20, 30, 40, 70];

let highMarks = marks.filter(x => x > 60);
console.log(highMarks); // [70]

let fruits: string[] = ['pineapple', 'banana', 'apple', 'mango'];
let withApple = fruits.filter(x => x.includes('apple'));
console.log(withApple); // ['pineapple', 'apple']
```

---

### Q6. What is a Tuple in TypeScript?

**Answer:**
A Tuple is a **special, fixed-length array** where each position has a specific type. Unlike a regular array, a tuple enforces both the **number** of elements and the **type at each position**.

```typescript
// Array — same type, flexible length
let scores: number[] = [10, 20, 30];

// Tuple — different types, FIXED positions
let student: [number, string, boolean] = [1, 'Rajiv', true];

student[0] = 'hello'; // TypeScript ERROR — position 0 must be number
student[1] = 99;      // TypeScript ERROR — position 1 must be string
```

---

### Q7. What is the difference between `slice` and `splice`?

**Answer:**

| Feature           | `slice`                          | `splice`                              |
|-------------------|----------------------------------|---------------------------------------|
| Modifies original | ❌ No (non-destructive)           | ✅ Yes (mutates original)              |
| Returns           | New sub-array                    | Array of removed elements             |
| Parameters        | `(start, end)` end excluded      | `(start, deleteCount, ...items)`      |
| Adds elements     | No                               | Yes                                   |

```typescript
let fruits: string[] = ['pineapple', 'banana', 'mango', 'grapes'];

// slice — non-destructive
let sliced = fruits.slice(1, 3);
console.log(fruits);  // ['pineapple', 'banana', 'mango', 'grapes'] ← unchanged
console.log(sliced);  // ['banana', 'mango']

// splice — destructive
fruits.splice(2, 0, 'kiwi'); // at index 2, delete 0, insert 'kiwi'
console.log(fruits);  // ['pineapple', 'banana', 'kiwi', 'mango', 'grapes']
```

---

### Q8. What is a `readonly` array and why would you use it?

**Answer:**
A `readonly` array prevents all mutations — no `push`, `pop`, `splice`, or index reassignment.

```typescript
let cities: readonly string[] = ['Pune', 'Mumbai'];

cities.push('Delhi');  // ERROR: Property 'push' does not exist on readonly
cities[0] = 'Nashik';  // ERROR: Index signature only permits reading
```

**Use when:** you have configuration data, test fixtures, or constants that must never change — the TypeScript compiler catches accidental modifications at compile time.

---

### Q9. What is a Union Array in TypeScript?

**Answer:**
A union array can hold values of **more than one type**:

```typescript
let student1: (string | number)[] = ['Rajan', 1];
let mixed: (string | boolean)[] = ['active', true, 'admin', false];

console.log(student1); // ['Rajan', 1]
```

The parentheses `()` around the union are required — without them `string | number[]` would mean "string OR an array of numbers".

---

## 🟡 INTERMEDIATE QUESTIONS

---

### Q10. What is the difference between `const` array and `readonly` array?

**Answer:**

| Feature           | `const`                           | `readonly`                        |
|-------------------|-----------------------------------|-----------------------------------|
| Prevents          | Reassignment of the variable      | Mutation of array contents        |
| `.push()` allowed | Yes ✅                             | No ❌                              |
| Reassignment      | Not allowed ❌                    | Allowed ✅                         |

```typescript
const fruits = ['apple', 'mango'];
fruits.push('banana');  // ALLOWED — const only blocks reassignment
fruits = ['kiwi'];      // ERROR — cannot reassign const

let city: readonly string[] = ['Pune'];
city.push('Mumbai');    // ERROR — readonly blocks mutations
city = ['Delhi'];       // ALLOWED — can reassign the variable
```

> The safest option is `const` + `readonly` together when you want neither.

---

### Q11. What is tuple destructuring and why is it useful?

**Answer:**
Destructuring unpacks tuple elements into **named variables**, making the code far more readable.

```typescript
let student: [number, string, boolean] = [1, 'Rajiv', true];

// Without destructuring — unclear
console.log(student[0]); // 1
console.log(student[1]); // Rajiv

// With destructuring — self-documenting
let [studentId, name, isIndianCitizen] = student;
console.log(studentId);       // 1
console.log(name);            // Rajiv
console.log(isIndianCitizen); // true
```

---

### Q12. What are rest elements in a tuple? Show an example.

**Answer:**
Rest elements (`...T[]`) allow a tuple to have a **fixed starting structure** followed by a **variable number of remaining elements**.

```typescript
let employee: [number, string, ...string[]] = [101, 'Ramesh', 'C', 'C++', 'Java'];

let [id, empName, ...skills] = employee;
console.log(id);      // 101
console.log(empName); // Ramesh
console.log(skills);  // ['C', 'C++', 'Java']
```

The first element must be `number`, the second `string`, and the rest can be any number of `string` values.

---

### Q13. What does the spread operator `...` do with arrays?

**Answer:**
The spread operator **expands** an array into individual elements. It is used to:

1. **Copy** an array (shallow copy)
2. **Merge** multiple arrays
3. **Pass** array elements as function arguments

```typescript
// 1. Copy — avoids mutation of original
let marks: number[] = [20, 90, 40];
let copy = [...marks];
marks.push(70);
console.log(marks); // [20, 90, 40, 70]
console.log(copy);  // [20, 90, 40]  ← unaffected

// 2. Merge
const frontend: string[] = ['html', 'css'];
const backend: string[] = ['java', 'node.js'];
const fullstack = [...frontend, ...backend];
console.log(fullstack); // ['html', 'css', 'java', 'node.js']

// 3. Function arguments
let nums: number[] = [3, 1, 4, 1, 5];
console.log(Math.max(...nums)); // 5
```

---

### Q14. What is an optional element in a tuple? Show an example.

**Answer:**
Mark an element with `?` to make it optional — the tuple can have fewer elements than declared.

```typescript
let access: [string, string?] = ['testuser'];     // 1 element — valid
console.log(access); // ['testuser']

access = ['testuser2', 'admin'];                  // 2 elements — also valid
console.log(access); // ['testuser2', 'admin']

// But order is still enforced:
access = [42, 'admin']; // ERROR — position 0 must be string
```

---

### Q15. How does `forEach` differ from `for-of` when iterating an array?

**Answer:**

| Feature           | `forEach`                           | `for-of`                         |
|-------------------|-------------------------------------|----------------------------------|
| Syntax            | Callback function                   | Loop keyword                     |
| Break/Continue    | Cannot use `break` or `continue`    | Can use `break` and `continue`   |
| Returns           | `undefined` always                  | N/A (not a return)               |
| Use when          | You need index too (2nd param)      | You need to break out early      |

```typescript
let fruits: string[] = ['apple', 'banana', 'mango'];

// forEach — with index
fruits.forEach((value, index) => {
  console.log(`${index}: ${value}`);
});

// for-of — with break
for (let fruit of fruits) {
  if (fruit === 'banana') break; // can exit early
  console.log(fruit);
}
```

---

### Q16. What is the difference between `find` and `filter`?

**Answer:**

| Feature    | `find`                              | `filter`                             |
|------------|-------------------------------------|--------------------------------------|
| Returns    | **First** matching element (or `undefined`) | **All** matching elements (array) |
| When found | Stops immediately                   | Continues through entire array       |
| Return type| Single element or `undefined`       | Array (may be empty)                 |

```typescript
let marks: number[] = [20, 30, 70, 40, 90];

let first = marks.find(x => x > 60);
console.log(first);  // 70  ← only first match

let all = marks.filter(x => x > 60);
console.log(all);    // [70, 90]  ← all matches
```

---

## 🔴 TRICKY QUESTIONS

---

### Q17. ⚡ What is the output? (shallow copy trap)

```typescript
let marks: number[] = [20, 90, 40];
let newArray = [...marks];

marks.push(70);

console.log(marks);    // ?
console.log(newArray); // ?
```

**Answer:**
```
[20, 90, 40, 70]
[20, 90, 40]
```

Spread creates a **shallow copy** — for primitive arrays (`number`, `string`), this works as a full independent copy. Pushing to `marks` does NOT affect `newArray`.

> **Shallow copy caveat:** If the array contains **objects**, spread only copies references — modifying a nested object in one will affect the other.

---

### Q18. ⚡ What is the output? (shallow copy with objects trap)

```typescript
let users = [{ name: 'Alice' }, { name: 'Bob' }];
let copy = [...users];

copy[0].name = 'Charlie';

console.log(users[0].name); // ?
console.log(copy[0].name);  // ?
```

**Answer:**
```
Charlie
Charlie
```

**Why?**
Spread only copies the **references** to objects, not the objects themselves. Both `users[0]` and `copy[0]` point to the same object in memory. Modifying one modifies both.

> **Fix:** Use deep copy: `JSON.parse(JSON.stringify(users))` or `structuredClone(users)`.

---

### Q19. ⚡ What's wrong with this tuple declaration?

```typescript
let record: [string, number] = ['Alice', 25];
record = [30, 'Bob']; // ?
```

**Answer:**
This is a **TypeScript ERROR**:
```
Type 'number' is not assignable to type 'string'.
Type 'string' is not assignable to type 'number'.
```

Tuples enforce **type at each position**. Position 0 must always be `string`, position 1 must always be `number`. Swapping them violates the contract.

---

### Q20. ⚡ What is the output? (push on a tuple)

```typescript
let student: [number, string] = [1, 'Rajiv'];

student.push(true);         // Is this allowed?
student.push('hello');      // Is this allowed?
console.log(student);       // ?
```

**Answer:**
```
[1, 'Rajiv', true, 'hello']
```

**Why?**
TypeScript allows `push` on tuples (it's a known limitation/loophole). The compile-time definition says `[number, string]`, but `push` accepts `number | string | boolean` (the union of all declared types). Once pushed, the extra elements exist at runtime even though TypeScript didn't strictly block it.

> **Fix:** Use `readonly` to prevent `push` entirely:
```typescript
let student: readonly [number, string] = [1, 'Rajiv'];
student.push(true); // TypeScript ERROR — push doesn't exist on readonly
```

---

### Q21. ⚡ What is the difference between these two type declarations?

```typescript
let a: string | number[];
let b: (string | number)[];
```

**Answer:**

- `a: string | number[]` — `a` is **either** a `string` **or** an `array of numbers`
- `b: (string | number)[]` — `b` is an **array** that holds `string` OR `number` values

```typescript
let a: string | number[];
a = 'hello';      // valid — it's a string
a = [1, 2, 3];    // valid — it's a number array
a = ['a', 1];     // ERROR — not string, not number[]

let b: (string | number)[];
b = ['Alice', 1, 'Bob', 2]; // valid — mixed array
b = 'hello';                // ERROR — must be an array
```

---

### Q22. ⚡ What does `splice` return?

```typescript
let fruits: string[] = ['apple', 'banana', 'mango', 'grapes'];

let removed = fruits.splice(1, 2);

console.log(fruits);  // ?
console.log(removed); // ?
```

**Answer:**
```
['apple', 'grapes']
['banana', 'mango']
```

`splice` **removes** elements from the original array and **returns** the removed elements as a new array. The original array is mutated.

---

### Q23. ⚡ Predict the output (slice edge cases)

```typescript
let nums: number[] = [10, 20, 30, 40, 50];

console.log(nums.slice(1));     // ?
console.log(nums.slice(1, 3));  // ?
console.log(nums.slice(-2));    // ?
console.log(nums.slice(0, -1)); // ?
```

**Answer:**
```
[20, 30, 40, 50]   ← from index 1 to end
[20, 30]           ← index 1 and 2 (3 is excluded)
[40, 50]           ← last 2 elements
[10, 20, 30, 40]   ← all except last
```

> Negative indices in `slice` count from the **end** of the array. `-1` is the last element, `-2` is second to last.

---

### Q24. ⚡ What happens when you use `push` instead of spread to combine arrays?

```typescript
let a: number[] = [1, 2];
let b: number[] = [3, 4];

a.push(b);
console.log(a); // ?
```

**Answer:**
```
[1, 2, [3, 4]]   ← b is nested as a single element!
```

TypeScript will actually **flag this as an error**: `Argument of type 'number[]' is not assignable to parameter of type 'number'`.

**Correct approach:**
```typescript
let merged = [...a, ...b];   // [1, 2, 3, 4]  ← flat and type-safe

// Or mutate in place:
a.push(...b);                 // [1, 2, 3, 4]
```

---

### Q25. ⚡ What is the output? (tuple destructuring with rest)

```typescript
let employee: [number, string, ...string[]] = [101, 'Ramesh', 'C', 'C++', 'Java'];

let [id, name, first, ...rest] = employee;

console.log(id);    // ?
console.log(name);  // ?
console.log(first); // ?
console.log(rest);  // ?
```

**Answer:**
```
101
Ramesh
C
['C++', 'Java']
```

Destructuring with rest in a tuple grabs the first two fixed elements (`id`, `name`), then pulls the **first rest element** into `first`, and all remaining rest elements into `rest`.

---

### Q26. ⚡ Is this valid? What does TypeScript infer?

```typescript
let data = [1, 'hello', true];
```

**Answer:**
Yes, this is valid. TypeScript **infers** the type as `(number | string | boolean)[]` — a union array.

```typescript
let data = [1, 'hello', true]; // inferred as (number | string | boolean)[]

data.push(42);       // OK
data.push('world');  // OK
data.push(false);    // OK
data.push({});       // ERROR — object not in the union
```

> If you want a tuple instead, you must **explicitly declare** the type:
```typescript
let data: [number, string, boolean] = [1, 'hello', true]; // now it's a tuple
```

---

### Q27. ⚡ What is `reverse()` behaviour — does it return a new array or mutate?

```typescript
let marks: [number, number, number, number] = [78, 72, 76, 99];

let reversed = marks.reverse();

console.log(marks);    // ?
console.log(reversed); // ?
console.log(marks === reversed); // ?
```

**Answer:**
```
[99, 76, 72, 78]
[99, 76, 72, 78]
true
```

**Why?**
`reverse()` **mutates the original** array in place AND returns a reference to the **same array** — not a copy! So both `marks` and `reversed` point to the same object.

> **Fix if you don't want to mutate:**
```typescript
let reversed = [...marks].reverse(); // spread creates a copy first
```

---

## 🎭 AUTOMATION / PLAYWRIGHT CONTEXT QUESTIONS

---

### Q28. How would you use `filter` in a Playwright test scenario?

**Answer:**
```typescript
const pages: string[] = ['/home', '/login', '/error', '/dashboard', '/404'];

// Filter out error pages before testing
const validPages = pages.filter(p => !p.includes('error') && !p.includes('404'));

for (const page of validPages) {
  console.log(`Testing: ${page}`);
  // await browser.goto(`https://myapp.com${page}`);
}
```

---

### Q29. How would you use a tuple to represent a test step result?

**Answer:**
```typescript
// Tuple: [testName, passed, duration_ms]
type TestResult = [string, boolean, number];

let results: TestResult[] = [
  ['Login Test', true, 1200],
  ['Search Test', false, 3400],
  ['Checkout Test', true, 890],
];

for (let [testName, passed, duration] of results) {
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} | ${testName} | ${duration}ms`);
}
// ✅ PASS | Login Test | 1200ms
// ❌ FAIL | Search Test | 3400ms
// ✅ PASS | Checkout Test | 890ms
```

---

### Q30. How would you use `map` to transform test data?

**Answer:**
```typescript
const baseUrls: string[] = ['/home', '/about', '/contact'];
const baseUrl: string = 'https://myapp.com';

// Prepend base URL to each path
const fullUrls: string[] = baseUrls.map(path => `${baseUrl}${path}`);

console.log(fullUrls);
// ['https://myapp.com/home', 'https://myapp.com/about', 'https://myapp.com/contact']

// Use in tests
for (const url of fullUrls) {
  console.log(`Navigating to: ${url}`);
  // await page.goto(url);
}
```

---

## ⚡ Quick-Fire Round

| Question | Answer |
|----------|--------|
| `push` adds to which end? | End |
| `shift` removes from which end? | Start |
| Does `map` mutate the original array? | No — returns new array |
| Does `filter` mutate the original array? | No — returns new array |
| Does `splice` mutate the original array? | Yes ⚠️ |
| Does `slice` mutate the original array? | No |
| Does `reverse()` return a new array? | No — mutates and returns same reference |
| `for-in` on array gives what? | Index as **string** |
| `for-of` on array gives what? | Value |
| Tuple vs Array — key difference | Tuple: fixed length + position types |
| `const` array — can you `push`? | Yes |
| `readonly` array — can you `push`? | No — compile error |
| `string \| number[]` vs `(string \| number)[]` | Union of types vs union array |
| Does spread create a deep copy? | No — shallow only |
| How to prevent all tuple mutations? | `readonly [T1, T2]` |

---

## 💡 Interview Tips for Day 4

1. **`map` vs `filter`** — say clearly: *"Both return a NEW array, never modify original. `map` transforms every element; `filter` keeps only matching ones."*
2. **`slice` vs `splice`** — memory trick: *"`splice` has a 'p' for 'permanent change' — it mutates. `slice` is safe."*
3. **Tuple vs Array** — *"A tuple is like a typed row in a database — fixed columns with fixed types."*
4. **`reverse()` trap** — *"Many candidates miss that `reverse()` mutates the original. Always say: use `[...arr].reverse()` to avoid mutation."*
5. **Spread shallow copy** — *"Spread copies primitive values deeply but only copies references to objects."*
6. **`readonly` vs `const`** — *"const prevents variable reassignment; readonly prevents content mutation."*
7. **Type inference of `[]`** — *"TypeScript infers a mixed array as a union array, not a tuple. Explicit annotation is needed for tuples."*
8. **Automation angle** — connect to test data: *"In Playwright, I use `filter` to skip invalid URLs, `map` to build full URLs from paths, and tuples to type test result records."*

---

*Day 4 — Arrays & Tuples Interview Q&A | Part of the TypeScript Learning Series*
