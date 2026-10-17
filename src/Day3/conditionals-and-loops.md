# 🔀 TypeScript — Conditional Statements & Loops | Day 3

> **Learning Goal:** Master control flow in TypeScript — how to make decisions with conditions and repeat actions with loops, with type-safe code and real automation examples.

---

## 📌 What is Control Flow?

By default, TypeScript executes code **line by line**, top to bottom. **Control flow** lets you:

- **Skip or branch** code based on a condition → *Conditional Statements*
- **Repeat** code multiple times → *Loops*

---

# PART 1 — CONDITIONAL STATEMENTS

---

## 1. 🔵 `if` Statement

Executes a block of code **only when the condition is `true`**.

### Syntax

```typescript
if (condition) {
  // code runs only if condition is true
}
nextStatement; // always runs
```

### Code Example

```typescript
let age: number = 20;

if (age > 18) {
  console.log('User is eligible to vote');
}
console.log('Next statement'); // always prints
```

### Output

```
User is eligible to vote
Next statement
```

> **Tip:** If the condition is `false`, the block is completely **skipped** and execution jumps to `nextStatement`.

---

## 2. 🔵 `if-else` Statement

Handles **two branches** — one for `true`, one for `false`.

### Syntax

```typescript
if (condition) {
  // runs when condition is true
} else {
  // runs when condition is false
}
```

### Code Example

```typescript
let a: number = 11;

if (a % 2 === 0) {
  console.log(`${a} is Even`);
} else {
  console.log(`${a} is Odd`);
}
console.log('next'); // always runs
```

### Output

```
11 is Odd
next
```

---

## 3. 🔵 `if-else if-else` Ladder

Handles **multiple conditions** — checked top to bottom. The **first matching** block runs.

### Syntax

```typescript
if (condition1) {
  // runs if condition1 is true
} else if (condition2) {
  // runs if condition2 is true
} else if (condition3) {
  // runs if condition3 is true
} else {
  // runs if none of the above are true
}
```

### Code Example — Find the Largest Number

```typescript
let a: number = 11;
let b: number = 40;
let c: number = 30;

if (a > b && a > c) {
  console.log(`${a} is bigger`);
} else if (b > a && b > c) {
  console.log(`${b} is bigger`);
} else {
  console.log(`${c} is bigger`);
}
console.log('next of if-else ladder');
```

### Output

```
40 is bigger
next of if-else ladder
```

### 🎭 Automation Context

```typescript
let statusCode: number = 404;

if (statusCode === 200) {
  console.log('PASS: Page loaded successfully');
} else if (statusCode === 404) {
  console.log('FAIL: Page not found');
} else if (statusCode === 500) {
  console.log('FAIL: Server error');
} else {
  console.log(`UNKNOWN status: ${statusCode}`);
}
```

---

## 4. 🔵 `switch-case` Statement

A cleaner alternative to long `if-else if` chains when comparing **one variable against many values**.

### Syntax

```typescript
switch (expression) {
  case value1:
    // code
    break;
  case value2:
    // code
    break;
  default:
    // runs if no case matches
}
```

### Code Example — Day of the Week

```typescript
let week: number = 5;

switch (week) {
  case 1: console.log('This is Week 1'); break;
  case 2: console.log('This is Week 2'); break;
  case 3: console.log('This is Week 3'); break;
  case 4: console.log('This is Week 4'); break;
  default: console.log('This is the default case');
}
console.log('After switch case block');
```

### Output

```
This is the default case
After switch case block
```

### Code Example — Multiple Cases (fall-through)

```typescript
let day: string = 'Saturday';

switch (day) {
  case 'Saturday':
  case 'Sunday':
    console.log('Weekend — no work!');
    break;
  case 'Monday':
  case 'Friday':
    console.log('Start/end of the week');
    break;
  default:
    console.log('Regular weekday');
}
```

### ⚠️ The `break` Keyword is Critical

Without `break`, execution **falls through** to the next case:

```typescript
let num: number = 1;

switch (num) {
  case 1: console.log('One');   // NO break — falls through!
  case 2: console.log('Two');   // also runs!
  case 3: console.log('Three'); // also runs!
    break;
  default: console.log('Other');
}
// Output: One  Two  Three
```

### `switch` vs `if-else` — When to Use Which

| Scenario                                    | Use          |
|---------------------------------------------|--------------|
| Comparing one variable to many fixed values | `switch`     |
| Complex boolean conditions (`&&`, `\|\|`)   | `if-else`    |
| Ranges (`age > 18 && age < 60`)             | `if-else`    |
| Type narrowing in TypeScript                | `switch`     |

---

# PART 2 — LOOPS

> **Why loops?** To repeat a block of code without writing it multiple times.

---

## 5. 🔁 `while` Loop

Checks the **condition first**. If `true`, runs the body. Repeats until the condition becomes `false`.

### Syntax

```typescript
while (condition) {
  // code to repeat
  // increment / decrement (must move toward exit)
}
nextStatement;
```

### Code Example

```typescript
let x: number = 1;

while (x <= 5) {
  console.log(`Count: ${x}`);
  x++;
}
console.log('Loop is done');
```

### Output

```
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
Loop is done
```

### Pre-condition Loop

> `while` is a **pre-condition** loop — condition is checked **before** each iteration.
> If the condition is `false` from the start, the body **never executes**.

```typescript
let x: number = 21;

while (x <= 20) {
  console.log(x); // NEVER runs — condition is false from start
  x++;
}
console.log('Loop printed'); // This runs
```

---

## 6. 🔁 `do-while` Loop

Executes the body **at least once**, then checks the condition.

### Syntax

```typescript
do {
  // code to repeat
  // increment / decrement
} while (condition);
nextStatement;
```

### Code Example

```typescript
let x: number = 21;

do {
  console.log(x); // Executes ONCE even though x > 20
  x++;
} while (x <= 20);

console.log('Do while is executed');
```

### Output

```
21
Do while is executed
```

### `while` vs `do-while`

| Feature                          | `while`          | `do-while`         |
|----------------------------------|------------------|--------------------|
| Condition checked                | Before iteration | After iteration    |
| Minimum executions               | 0 times          | **Always 1 time**  |
| Use when body may not run at all | ✅               | ❌                 |
| Use when body must run once      | ❌               | ✅                 |

---

## 7. 🔁 `for` Loop

Best when you know **exactly how many times** to repeat.

### Syntax

```typescript
for (initialization; condition; increment/decrement) {
  // code
}
```

| Part              | Purpose                               |
|-------------------|---------------------------------------|
| `initialization`  | Set the starting value (runs once)    |
| `condition`       | Checked before each iteration         |
| `increment`       | Runs after each iteration             |

### Code Example

```typescript
for (let i: number = 1; i <= 10; i++) {
  console.log(i);
}
console.log('For loop is executed');
```

### Output

```
1  2  3  4  5  6  7  8  9  10
For loop is executed
```

### Count Downward

```typescript
for (let i: number = 10; i >= 1; i--) {
  console.log(i);
}
```

### Step by 2

```typescript
for (let i: number = 0; i <= 10; i += 2) {
  console.log(i); // 0 2 4 6 8 10
}
```

---

## 8. 🔁 `for-in` Loop — Iterates Over **Indexes / Keys**

Used to iterate over the **indices (index numbers)** of an array or **keys** of an object.

### Syntax

```typescript
for (let index in collection) {
  // index is a string representing the position
}
```

### Code Example

```typescript
let fruits: string[] = ['apple', 'cherry', 'mango'];

for (let i in fruits) {
  console.log(`Index of ${fruits[i]} is ${i}`);
}
```

### Output

```
Index of apple is 0
Index of cherry is 1
Index of mango is 2
```

> **Important:** `for-in` gives the **index as a string**, not a number.

### With Objects

```typescript
let user = { name: 'Sushil', role: 'Tester', city: 'Pune' };

for (let key in user) {
  console.log(`${key}: ${user[key as keyof typeof user]}`);
}
// name: Sushil
// role: Tester
// city: Pune
```

---

## 9. 🔁 `for-of` Loop — Iterates Over **Values**

Used to iterate over the **actual values** in an array, string, or any iterable.

### Syntax

```typescript
for (let item of collection) {
  // item holds the current value directly
}
```

### Code Example

```typescript
let fruits: string[] = ['apple', 'cherry', 'mango'];

for (let fruit of fruits) {
  console.log(fruit);
}
```

### Output

```
apple
cherry
mango
```

### `for-in` vs `for-of`

| Feature        | `for-in`              | `for-of`               |
|----------------|-----------------------|------------------------|
| Returns        | Index / Key (string)  | Value                  |
| Works on       | Arrays, Objects       | Arrays, Strings, Maps, Sets |
| Use case       | When you need index   | When you need value    |

```typescript
let fruits: string[] = ['apple', 'cherry'];

for (let i in fruits) {
  console.log(i);       // 0, 1   ← INDEX
}

for (let f of fruits) {
  console.log(f);       // apple, cherry  ← VALUE
}
```

---

## 10. ⛔ `break` and `continue`

### `break` — Exit the Loop Immediately

```typescript
for (let i: number = 1; i <= 10; i++) {
  if (i === 5) {
    console.log('Breaking at 5');
    break; // exits the loop entirely
  }
  console.log(i);
}
// Output: 1 2 3 4 Breaking at 5
```

### `continue` — Skip Current Iteration

```typescript
for (let i: number = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue; // skip even numbers
  }
  console.log(i);
}
// Output: 1 3 5 7 9  (only odd numbers)
```

### `break` vs `continue`

| Keyword    | Effect                                     |
|------------|--------------------------------------------|
| `break`    | Exits the loop completely                  |
| `continue` | Skips the **current** iteration, continues to next |

### 🎭 Automation Context

```typescript
let pages: string[] = ['/home', '/login', '/404-error', '/dashboard'];

for (let page of pages) {
  if (page.includes('error')) {
    console.log(`Skipping error page: ${page}`);
    continue; // don't test error pages
  }
  console.log(`Testing page: ${page}`);
}
```

---

## 🚀 All Loops at a Glance

| Loop         | Best Used When                               | Condition Check |
|--------------|----------------------------------------------|-----------------|
| `while`      | Unknown iterations, condition-first          | Before iteration |
| `do-while`   | Must run at least once                       | After iteration  |
| `for`        | Known number of iterations                   | Before iteration |
| `for-in`     | Need index/key of array or object            | Before iteration |
| `for-of`     | Need values from array/string/iterable       | Before iteration |

---

## 🧠 Key Takeaways

1. **`if-else if-else`** — only the **first matching** condition block runs.
2. **`switch`** — always add `break` unless you intentionally want fall-through.
3. **`while`** — condition checked first; may **never run** if false from start.
4. **`do-while`** — always runs **at least once**.
5. **`for-in`** gives **index/key** (as a string); **`for-of`** gives **value**.
6. **`break`** exits the loop; **`continue`** skips to the next iteration.
7. **Infinite loop** happens when the condition never becomes `false` — always ensure the loop has a proper exit condition.

---

## 📝 Practice Exercises

1. Print numbers 1 to 100. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", for both print "FizzBuzz".
2. Use a `while` loop to find the sum of digits of a number (e.g., `123 → 1+2+3 = 6`).
3. Use `for-of` to count how many fruits in an array contain the letter `'a'`.
4. Use `switch` to build a simple calculator — take an operation string (`'add'`, `'sub'`, `'mul'`, `'div'`) and two numbers.
5. Use `do-while` to simulate a login retry system — keep asking until correct password is matched (max 3 attempts).
6. Use `for-in` to print all keys and values of a `user` object.
7. Use `break` to find the first number divisible by both 3 and 7 in range 1–200.

---

*Day 3 — Conditional Statements & Loops | Part of the TypeScript Learning Series*
