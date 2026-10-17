# 🎯 TypeScript — Conditional Statements & Loops | Day 3 Interview Q&A

> Covers: `if`, `if-else`, `if-else if` ladder, `switch-case`, `while`, `do-while`, `for`, `for-in`, `for-of`, `break`, `continue`
> Difficulty: 🟢 Basic → 🟡 Intermediate → 🔴 Tricky / Advanced

---

## 🟢 BASIC QUESTIONS

---

### Q1. What is a conditional statement and why do we use it?

**Answer:**
A conditional statement controls the **flow of execution** based on whether a condition evaluates to `true` or `false`. Without it, every line of code would always run — we'd have no way to make decisions.

```typescript
let age: number = 20;

if (age >= 18) {
  console.log('Eligible to vote'); // runs only when condition is true
}
```

TypeScript adds a layer of **type safety** — it will catch errors like comparing a `string` to a `number` at compile time.

---

### Q2. What are the different types of conditional statements in TypeScript?

**Answer:**

| Statement        | Use When                                      |
|------------------|-----------------------------------------------|
| `if`             | Single condition, one branch                  |
| `if-else`        | Two branches: true or false path              |
| `if-else if`     | Multiple conditions checked in order          |
| `switch-case`    | One variable compared against many values     |
| Ternary `? :`    | Simple one-line condition (covered in Day 2)  |

---

### Q3. What is the difference between `if-else` and `switch-case`?

**Answer:**

| Feature           | `if-else`                          | `switch-case`                        |
|-------------------|------------------------------------|--------------------------------------|
| Condition type    | Any boolean expression             | Single value equality check          |
| Ranges allowed    | Yes (`age > 18 && age < 60`)       | No — only fixed values               |
| Logical operators | Yes (`&&`, `\|\|`)                 | Not directly                         |
| Readability       | Better for complex logic           | Cleaner for many fixed values        |
| Fall-through      | Not possible                       | Possible (without `break`)           |

```typescript
// switch is cleaner here:
let day: number = 3;

switch (day) {
  case 1: console.log('Monday'); break;
  case 2: console.log('Tuesday'); break;
  case 3: console.log('Wednesday'); break;
  default: console.log('Other day');
}
```

---

### Q4. What is the purpose of the `default` case in a `switch` statement?

**Answer:**
`default` is like the `else` block — it runs when **none of the `case` values match** the expression. It is optional but strongly recommended as a fallback.

```typescript
let status: number = 999;

switch (status) {
  case 200: console.log('OK'); break;
  case 404: console.log('Not Found'); break;
  case 500: console.log('Server Error'); break;
  default:  console.log(`Unknown status: ${status}`); // catches anything unexpected
}
// Output: Unknown status: 999
```

---

### Q5. What are the different types of loops in TypeScript?

**Answer:**

| Loop       | Best Used For                                  |
|------------|------------------------------------------------|
| `while`    | Unknown iterations, condition-first check      |
| `do-while` | Must execute at least once                     |
| `for`      | Known number of iterations                     |
| `for-in`   | Iterating over **indexes/keys** of arrays/objects |
| `for-of`   | Iterating over **values** of arrays/iterables  |

---

### Q6. What is the difference between `for-in` and `for-of`?

**Answer:**

| Feature     | `for-in`                             | `for-of`                          |
|-------------|--------------------------------------|-----------------------------------|
| Returns     | **Index / Key** (as a string)        | **Value** directly                |
| Works on    | Arrays, Objects                      | Arrays, Strings, Maps, Sets       |
| Use when    | You need the position/key            | You need the actual value         |

```typescript
let fruits: string[] = ['apple', 'cherry', 'mango'];

for (let i in fruits) {
  console.log(i);        // "0", "1", "2"  ← INDEX (string)
}

for (let fruit of fruits) {
  console.log(fruit);    // apple, cherry, mango  ← VALUE
}
```

---

### Q7. What is the difference between `break` and `continue`?

**Answer:**

| Keyword    | Effect                                              |
|------------|-----------------------------------------------------|
| `break`    | **Exits** the entire loop immediately               |
| `continue` | **Skips** the current iteration, jumps to next one  |

```typescript
// break — stops at 5
for (let i = 1; i <= 10; i++) {
  if (i === 5) break;
  console.log(i); // 1 2 3 4
}

// continue — skips even numbers
for (let i = 1; i <= 6; i++) {
  if (i % 2 === 0) continue;
  console.log(i); // 1 3 5
}
```

---

### Q8. What is the minimum number of times a `while` loop and a `do-while` loop execute?

**Answer:**

| Loop       | Minimum executions | Why                                          |
|------------|--------------------|----------------------------------------------|
| `while`    | **0 times**        | Condition checked BEFORE entry               |
| `do-while` | **1 time**         | Body executes BEFORE condition is checked    |

```typescript
let x: number = 21;

// while — never executes (condition is false immediately)
while (x <= 20) {
  console.log('while:', x); // never prints
}

// do-while — executes ONCE even though x > 20
do {
  console.log('do-while:', x); // prints: do-while: 21
  x++;
} while (x <= 20);
```

---

## 🟡 INTERMEDIATE QUESTIONS

---

### Q9. What happens if you forget the `break` in a `switch` statement?

**Answer:**
Without `break`, execution **falls through** — it continues running into the next `case` regardless of whether it matches.

```typescript
let num: number = 1;

switch (num) {
  case 1: console.log('One');   // matches, runs
  case 2: console.log('Two');   // falls through — also runs!
  case 3: console.log('Three'); // falls through — also runs!
    break;
  default: console.log('Other');
}
// Output: One  Two  Three
```

**Intentional fall-through** can be useful:
```typescript
let day: string = 'Saturday';

switch (day) {
  case 'Saturday':
  case 'Sunday':
    console.log('It is the weekend!'); // both cases hit same block
    break;
  default:
    console.log('Weekday');
}
```

---

### Q10. How does TypeScript's `if-else` handle type narrowing?

**Answer:**
TypeScript uses conditions to **narrow** (refine) the type of a variable within a block.

```typescript
function printLength(value: string | number): void {
  if (typeof value === 'string') {
    // TypeScript KNOWS value is string here
    console.log(`String length: ${value.length}`);
  } else {
    // TypeScript KNOWS value is number here
    console.log(`Number: ${value.toFixed(2)}`);
  }
}

printLength('Hello'); // String length: 5
printLength(3.14159); // Number: 3.14
```

> This is one of TypeScript's most powerful features — control flow is used to **automatically narrow types** without explicit casting.

---

### Q11. Can you use `for-in` on an object? Show an example.

**Answer:**
Yes! `for-in` is actually designed for objects — it iterates over **enumerable property keys**.

```typescript
let user = {
  name: 'Sushil',
  role: 'Tester',
  city: 'Pune'
};

for (let key in user) {
  console.log(`${key}: ${user[key as keyof typeof user]}`);
}
// Output:
// name: Sushil
// role: Tester
// city: Pune
```

> **Note:** Using `for-of` on a plain object will throw a TypeError — plain objects are **not iterable**. Use `for-in` or `Object.entries()` instead.

---

### Q12. What is an infinite loop and how do you avoid it?

**Answer:**
An infinite loop occurs when the **exit condition never becomes `false`**, causing the loop to run forever, crashing the program.

```typescript
// INFINITE LOOP — never stops! (x never changes)
let x: number = 1;
while (x > 0) {
  console.log(x); // runs forever!
  // x++ is missing!
}
```

**How to avoid:**
1. Always ensure the loop variable moves **toward the exit condition**
2. Use `break` as a safety valve
3. Add a **maximum iteration guard**:

```typescript
let x: number = 1;
let maxIterations: number = 1000;

while (x > 0 && maxIterations-- > 0) {
  console.log(x);
  x++; // ← always include this
}
```

---

### Q13. What is the difference between `while` and `for` loops? When would you choose one over the other?

**Answer:**

| Feature            | `for`                             | `while`                          |
|--------------------|-----------------------------------|----------------------------------|
| Best when          | Number of iterations is **known** | Iterations depend on a condition |
| Counter management | Built-in (`init; cond; incr`)     | Manual (must write separately)   |
| Readability        | Compact, all in one line          | More flexible                    |

```typescript
// for — when you know count
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// while — when you don't know how many times
let input: string = '';
let attempts: number = 0;

while (input !== 'quit' && attempts < 5) {
  input = 'someInput'; // simulate input
  attempts++;
}
```

---

### Q14. How can you iterate over both index and value of an array simultaneously?

**Answer:**
Use the `entries()` method with `for-of`:

```typescript
let fruits: string[] = ['apple', 'cherry', 'mango'];

for (let [index, value] of fruits.entries()) {
  console.log(`${index}: ${value}`);
}
// Output:
// 0: apple
// 1: cherry
// 2: mango
```

Or using a regular `for` loop:
```typescript
for (let i = 0; i < fruits.length; i++) {
  console.log(`${i}: ${fruits[i]}`);
}
```

---

### Q15. What is a nested loop? Give a practical example.

**Answer:**
A loop inside another loop. The **inner loop completes all its iterations** for every single iteration of the outer loop.

```typescript
// Multiplication table
for (let i: number = 1; i <= 3; i++) {
  for (let j: number = 1; j <= 3; j++) {
    console.log(`${i} x ${j} = ${i * j}`);
  }
}
// Output:
// 1 x 1 = 1, 1 x 2 = 2, 1 x 3 = 3
// 2 x 1 = 2, 2 x 2 = 4, 2 x 3 = 6
// 3 x 1 = 3, 3 x 2 = 6, 3 x 3 = 9
```

> **Performance Warning:** Nested loops have O(n²) complexity. Avoid deep nesting in production code.

---

## 🔴 TRICKY QUESTIONS

---

### Q16. ⚡ What is the output of this code? (do-while trap)

```typescript
let x: number = 21;

do {
  console.log(x);
  x++;
} while (x <= 20);

console.log('Done');
```

**Answer:**
```
21
Done
```

**Why?**
The `do-while` executes the body **first**, then checks the condition. Even though `x = 21` is already greater than `20`, the body runs once, prints `21`, increments `x` to `22`, then checks `22 <= 20` which is `false`, so the loop exits.

---

### Q17. ⚡ What does `for-in` return when used on an array — a number or a string?

**Answer:**
It returns a **string**, not a number!

```typescript
let arr: string[] = ['a', 'b', 'c'];

for (let i in arr) {
  console.log(typeof i); // "string"
  console.log(i);        // "0", "1", "2"  ← strings!
}
```

**This matters in comparisons:**
```typescript
for (let i in arr) {
  if (i === 0) {   // NEVER true — "0" (string) !== 0 (number)
    console.log('first');
  }
  if (i === '0') { // true — both strings
    console.log('first'); // prints this
  }
}
```

> **This is why `for-of` is preferred for arrays** — it gives the actual typed value.

---

### Q18. ⚡ What is the output? (switch fall-through trap)

```typescript
let score: number = 2;

switch (score) {
  case 1:
  case 2:
  case 3:
    console.log('Low score');
    break;
  case 4:
  case 5:
    console.log('High score');
    break;
  default:
    console.log('Invalid');
}
```

**Answer:**
```
Low score
```

**Why?**
`score = 2` matches `case 2`, which has no code and falls through to `case 3`. `case 3` has `console.log('Low score')` followed by `break`. This is **intentional fall-through** — all of cases 1, 2, and 3 share the same block.

---

### Q19. ⚡ Will this loop run? How many times?

```typescript
for (let i: number = 10; i <= 5; i++) {
  console.log(i);
}
console.log('Done');
```

**Answer:**
```
Done
```

The loop body runs **zero times**. The initial condition `10 <= 5` is already `false`, so the loop never enters. Only `'Done'` is printed.

---

### Q20. ⚡ What is the output? (`break` in nested loop trap)

```typescript
outer: for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    if (j === 2) break;
    console.log(`i=${i}, j=${j}`);
  }
}
```

**Answer:**
```
i=1, j=1
i=2, j=1
i=3, j=1
```

**Why?**
`break` without a label only exits the **inner loop**. The outer loop continues. So for each `i`, the inner loop runs until `j === 2`, then breaks — meaning only `j=1` prints each time.

> **Bonus:** TypeScript (like JavaScript) supports **labelled breaks** to exit an outer loop:
```typescript
outer: for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    if (j === 2) break outer; // exits BOTH loops
    console.log(`i=${i}, j=${j}`);
  }
}
// Output: i=1, j=1  (only one line!)
```

---

### Q21. ⚡ What is the difference between these two loops in terms of output?

```typescript
// Loop A
for (let i = 0; i < 3; i++) {
  console.log(i);
}

// Loop B
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}
```

**Answer:**
Both produce **identical output**:
```
0
1
2
```

A `for` loop is essentially syntactic sugar for a `while` loop with an explicit counter. The difference is:
- `for` — cleaner, counter scoped to the loop
- `while` — more flexible; `i` is accessible after the loop ends

---

### Q22. ⚡ What is the output of this `switch` with no `break`?

```typescript
let x: number = 1;

switch (x) {
  case 1:
    console.log('One');
  case 2:
    console.log('Two');
  default:
    console.log('Default');
}
```

**Answer:**
```
One
Two
Default
```

**Why?**
After `case 1` matches and prints `'One'`, there is no `break`, so execution falls through to `case 2` (prints `'Two'`), then falls through to `default` (prints `'Default'`).

---

### Q23. ⚡ Can `continue` be used inside a `switch` statement?

**Answer:**
`continue` cannot be used directly inside a `switch` — it only works inside **loops**. However, if a `switch` is inside a loop, `continue` will skip to the **next iteration of the loop**:

```typescript
for (let i = 1; i <= 5; i++) {
  switch (i % 2) {
    case 0:
      console.log(`${i} is even`);
      break;
    case 1:
      if (i === 3) continue; // skips rest of THIS loop iteration (i=3)
      console.log(`${i} is odd`);
  }
}
// Output:
// 1 is odd
// 2 is even
// (3 is skipped)
// 4 is even
// 5 is odd
```

---

### Q24. ⚡ What is the output? (`if` assignment vs comparison trap)

```typescript
let a: number = 0;

if (a = 5) {      // assignment, not comparison!
  console.log('True:', a);
} else {
  console.log('False:', a);
}
```

**Answer:**
```
True: 5
```

**Why?**
`a = 5` is an **assignment** that evaluates to `5`. Since `5` is truthy, the `if` block runs. `a` is now `5`.

> **TypeScript will warn you** about this with: *"This condition will always return true since the types have no overlap"* or similar — another safety win for TypeScript over plain JavaScript!

---

### Q25. ⚡ FizzBuzz — Predict the output for `i = 1` to `15`.

```typescript
for (let i: number = 1; i <= 15; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log('FizzBuzz');
  } else if (i % 3 === 0) {
    console.log('Fizz');
  } else if (i % 5 === 0) {
    console.log('Buzz');
  } else {
    console.log(i);
  }
}
```

**Answer:**
```
1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz
```

> **Key insight:** The `FizzBuzz` case (divisible by both) must be checked **first** — otherwise `Fizz` or `Buzz` would match first and FizzBuzz would never trigger.

---

## 🎭 AUTOMATION / PLAYWRIGHT CONTEXT QUESTIONS

---

### Q26. How would you use a `for-of` loop in a Playwright test?

**Answer:**
```typescript
const pages: string[] = ['/home', '/about', '/contact'];

for (const page of pages) {
  // await page.goto(`https://myapp.com${url}`);
  console.log(`Navigating to: ${page}`);
  // await expect(page).toHaveURL(url);
}
```

---

### Q27. How would you use `break` in a Playwright retry scenario?

**Answer:**
```typescript
const maxRetries: number = 3;
let success: boolean = false;

for (let attempt = 1; attempt <= maxRetries; attempt++) {
  console.log(`Attempt ${attempt}...`);

  try {
    // await page.click('#submit');
    // await expect(page).toHaveURL('/dashboard');
    success = true;
    console.log('Test passed!');
    break; // exit as soon as test passes
  } catch (e) {
    console.log(`Attempt ${attempt} failed. Retrying...`);
  }
}

if (!success) {
  console.error('Test failed after all retries');
}
```

---

### Q28. How would `switch` help in handling different HTTP status codes in tests?

**Answer:**
```typescript
function handleStatus(statusCode: number): void {
  switch (statusCode) {
    case 200: console.log('PASS: Request successful'); break;
    case 201: console.log('PASS: Resource created'); break;
    case 400: console.log('FAIL: Bad request'); break;
    case 401: console.log('FAIL: Unauthorized — check credentials'); break;
    case 404: console.log('FAIL: Resource not found'); break;
    case 500: console.log('FAIL: Internal server error'); break;
    default:  console.log(`UNKNOWN status: ${statusCode}`);
  }
}

handleStatus(404); // FAIL: Resource not found
```

---

## ⚡ Quick-Fire Round

| Question | Answer |
|----------|--------|
| Minimum times a `while` loop runs | 0 |
| Minimum times a `do-while` loop runs | 1 |
| `for-in` returns index as what type? | `string` |
| `for-of` returns what? | Values |
| What does `break` do in a loop? | Exits the loop completely |
| What does `continue` do? | Skips current iteration |
| What runs when no `switch` case matches? | `default` block |
| Is `default` required in `switch`? | No, but recommended |
| `for-of` on a plain object — valid? | No — TypeError |
| `for-in` on a plain object — valid? | Yes — iterates keys |
| Can `break` exit an outer loop? | Yes, with a **labelled break** |
| `if (a = 5)` — what does this evaluate to? | `5` (truthy) — assignment, not comparison |

---

## 💡 Interview Tips for Day 3

1. **Draw the flow** — for `if-else if`, show "only the first matching block runs, then jumps out."
2. **`do-while` key phrase** — *"The body always executes at least once because the condition is checked AFTER."*
3. **`for-in` vs `for-of`** — practice this: *"`for-in` gives you the key/index (as a string), `for-of` gives you the value."*
4. **`break` in nested loops** — mention **labelled breaks** — interviewers are impressed by this edge case.
5. **FizzBuzz** — know it cold. Always check the combined condition first.
6. **Infinite loops** — show how to guard with a counter or `break`.
7. **Type narrowing** — mention how `if (typeof x === 'string')` lets TypeScript narrow the type inside the block — this is a TypeScript-specific strength.
8. **Automation context** — always connect to real scenarios: retry loops, iterating test data arrays, status code handling.

---

*Day 3 — Conditional Statements & Loops Interview Q&A | Part of the TypeScript Learning Series*
